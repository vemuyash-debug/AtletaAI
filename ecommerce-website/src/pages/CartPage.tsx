import React from 'react';
import Layout from '@/components/layout';
import { useCart } from '@/contexts/CartContext';
import Price from '@/components/ui/price';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  
  if (totalItems === 0) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-12">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <div className="text-center py-12 border rounded-lg">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link to="/category/shoes">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 mb-8 lg:mb-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => {
                    const itemPrice = item.product.discountPrice || item.product.price;
                    const itemTotal = itemPrice * item.quantity;
                    
                    return (
                      <TableRow key={`${item.product.id}-${item.size}-${item.color}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 bg-secondary rounded overflow-hidden">
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <Link 
                                to={`/product/${item.product.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="mr-2">Size: {item.size}</span>
                                <span>Color: {item.color}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Price 
                            price={item.product.price} 
                            discountPrice={item.product.discountPrice}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center border border-border rounded-md w-28">
                            <button
                              type="button"
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.size, 
                                item.color, 
                                Math.max(1, item.quantity - 1)
                              )}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <div className="flex-1 text-center text-sm">
                              {item.quantity}
                            </div>
                            <button
                              type="button"
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.size, 
                                item.color, 
                                Math.min(10, item.quantity + 1)
                              )}
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${itemTotal.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="border rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button className="w-full" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <div className="mt-4 text-center">
                <Link 
                  to="/home" 
                  className="text-sm text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;