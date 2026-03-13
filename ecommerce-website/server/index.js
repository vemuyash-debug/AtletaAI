import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

function buildOrderEmailHtml(orderData) {
  const itemsRows = (orderData.items || []).map((item) => {
    const price = item.product?.discountPrice ?? item.product?.price ?? 0;
    const lineTotal = (price * (item.quantity || 1)).toFixed(2);
    const name = item.product?.name ?? 'Product';
    const size = item.size ?? '';
    const color = item.color ?? '';
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${size} / ${color}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${lineTotal}</td>
      </tr>`;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${orderData.orderId || 'Your Order'}</title>
</head>
<body style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <div style="background: #111; color: #fff; padding: 24px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Order Confirmed</h1>
      <p style="margin: 8px 0 0; opacity: 0.9;">Thank you for your purchase</p>
    </div>
    <div style="padding: 24px;">
      <p style="margin: 0 0 16px;">Hi ${orderData.customerName || 'Customer'},</p>
      <p style="margin: 0 0 24px; color: #555;">Your order has been received and is being processed.</p>

      <table style="width: 100%; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="color: #888;">Order ID</td>
          <td style="text-align: right; font-weight: 600;">${orderData.orderId || '—'}</td>
        </tr>
        <tr>
          <td style="color: #888;">Date</td>
          <td style="text-align: right;">${orderData.date || '—'}</td>
        </tr>
        <tr>
          <td style="color: #888;">Payment</td>
          <td style="text-align: right;">${orderData.paymentMethod || 'Credit Card'}</td>
        </tr>
      </table>

      <p style="font-weight: 600; margin-bottom: 8px;">Shipping address</p>
      <p style="margin: 0 0 24px; color: #555;">${orderData.shippingAddress || '—'}</p>

      <p style="font-weight: 600; margin-bottom: 8px;">Order summary</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr style="background: #f9f9f9;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px;">Qty</th>
            <th style="padding: 10px;">Size / Color</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>

      <table style="width: 100%; font-size: 14px;">
        <tr><td style="padding: 4px 0; color: #666;">Subtotal</td><td style="text-align: right;">$${(orderData.subtotal ?? 0).toFixed(2)}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Tax</td><td style="text-align: right;">$${(orderData.tax ?? 0).toFixed(2)}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Shipping</td><td style="text-align: right;">Free</td></tr>
        <tr style="font-size: 16px; font-weight: 700;"><td style="padding: 12px 0 0;">Total</td><td style="text-align: right; padding-top: 12px;">$${(orderData.total ?? 0).toFixed(2)}</td></tr>
      </table>
    </div>
    <div style="padding: 16px 24px; background: #f9f9f9; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
      If you have any questions, reply to this email or contact our support.
    </div>
  </div>
</body>
</html>`;
}

app.post('/api/send-order-confirmation', async (req, res) => {
  const orderData = req.body;
  const toEmail = orderData?.email;

  if (!toEmail || typeof toEmail !== 'string') {
    return res.status(400).json({ success: false, error: 'Customer email is required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — order confirmation email skipped. Set RESEND_API_KEY in server/.env to enable emails.');
    return res.json({ success: true, skipped: true, message: 'Email not sent (no API key)' });
  }

  const fromAddress = process.env.RESEND_FROM || 'Atheleta <onboarding@resend.dev>';
  const subject = `Order Confirmation - ${orderData.orderId || 'Your Order'}`;
  const html = buildOrderEmailHtml(orderData);

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: [toEmail.trim()],
    subject,
    html,
    idempotencyKey: `order-${orderData.orderId || Date.now()}`,
  });

  if (error) {
    console.error('[email] Resend error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }

  console.log('[email] Order confirmation sent to', toEmail, 'id:', data?.id);
  res.json({ success: true, id: data?.id });
});

app.get('/api/health', (_, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Email server running at http://localhost:${PORT}`);
});
