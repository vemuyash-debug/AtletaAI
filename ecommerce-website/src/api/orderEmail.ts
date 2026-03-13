/**
 * Sends order confirmation email to the customer.
 * Uses the backend at /api (proxied in dev to the email server).
 */
export interface OrderEmailPayload {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  shippingAddress: string;
  items: Array<{
    product: { id: string; name: string; price: number; discountPrice?: number; images?: string[] };
    quantity: number;
    size: string;
    color: string;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
}

export async function sendOrderConfirmationEmail(orderData: OrderEmailPayload): Promise<{ success: boolean; skipped?: boolean; error?: string }> {
  try {
    const res = await fetch('/api/send-order-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: data?.error || res.statusText };
    }
    return { success: true, skipped: data.skipped };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    return { success: false, error: message };
  }
}
