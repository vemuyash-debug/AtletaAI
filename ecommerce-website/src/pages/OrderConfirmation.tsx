import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Printer, FileText, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || { 
    orderData: {
      orderId: 'ORD' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      customerName: 'Guest Customer',
      email: 'guest@example.com',
      shippingAddress: '123 Main St, Anytown, USA',
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      paymentMethod: 'Credit Card'
    }
  };

  const handleContinueShopping = () => {
    navigate('/home');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{orderData.orderId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Order Information</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Order Date:</span> {orderData.date}</p>
                    <p><span className="text-muted-foreground">Order ID:</span> {orderData.orderId}</p>
                    <p><span className="text-muted-foreground">Payment Method:</span> {orderData.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Name:</span> {orderData.customerName}</p>
                    <p><span className="text-muted-foreground">Email:</span> {orderData.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-sm">{orderData.shippingAddress}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Size: {item.size} | Color: {item.color} | Quantity: {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${orderData.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Receipt
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Receipt
                </Button>
              </div>
              <Button variant="default" size="sm" className="flex items-center gap-2" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <Package className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="font-medium mb-1">Shipping Information</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Your order will be processed and shipped within 1-2 business days.
                  You will receive a shipping confirmation email with tracking information once your order ships.
                </p>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-primary hover:underline">View our shipping policy</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;