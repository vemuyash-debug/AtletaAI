
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Mail } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, items, totalPrice } = useCart();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Men', path: '/category/men' },
    { name: 'Women', path: '/category/women' },
    { name: 'Shoes', path: '/category/shoes' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-semibold tracking-tight">
          ATLETA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm tracking-wide transition-colors hover:text-primary ${
                isActive(item.path)
                  ? 'font-medium text-primary'
                  : 'text-foreground/80'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <div className="h-full flex flex-col">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium">Shopping Cart</h2>
                  <p className="text-sm text-muted-foreground">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
                  </p>
                </div>
                
                {/* Cart content here */}
                <div className="flex-1 overflow-auto py-6">
                  {totalItems === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add some products to your cart to see them here.
                      </p>
                      <Button asChild>
                        <Link to="/category/shoes">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => {
                        const itemPrice = item.product.discountPrice || item.product.price;
                        const itemTotal = itemPrice * item.quantity;
                        
                        return (
                          <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 pb-4 border-b">
                            <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">
                                <Link 
                                  to={`/product/${item.product.id}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                              </h4>
                              <div className="text-xs text-muted-foreground mt-1">
                                Size: {item.size} | Color: {item.color}
                              </div>
                              <div className="flex justify-between items-end mt-2">
                                <div className="text-sm">
                                  Qty: {item.quantity}
                                </div>
                                <div className="font-medium">
                                  ${itemTotal.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {totalItems > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Shipping</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link to="/cart">View Cart</Link>
                      </Button>
                      <Button className="flex-1">
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full glass shadow-md transition-transform duration-300 ease-out-expo transform ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container py-4 px-4 mx-auto space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-2 text-sm ${
                isActive(item.path)
                  ? 'font-medium text-primary'
                  : 'text-foreground/80'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
