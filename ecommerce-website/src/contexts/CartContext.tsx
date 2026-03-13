
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../data/types';
import { toast } from "sonner";

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size: string; color: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const calculateCartTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, size, color } = action.payload;
      
      // Check if item already exists in cart with same size and color
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      
      let newItems = [...state.items];
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        toast(`Updated quantity in cart`);
      } else {
        // Add new item
        newItems.push({ product, quantity, size, color });
        toast(`Added to cart`);
      }
      
      const { totalItems, totalPrice } = calculateCartTotals(newItems);
      return { items: newItems, totalItems, totalPrice };
    }
    
    case 'REMOVE_ITEM': {
      const { id, size, color } = action.payload;
      const newItems = state.items.filter(
        item => !(item.product.id === id && item.size === size && item.color === color)
      );
      const { totalItems, totalPrice } = calculateCartTotals(newItems);
      toast(`Item removed from cart`);
      return { items: newItems, totalItems, totalPrice };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, size, color, quantity } = action.payload;
      const newItems = state.items.map(item => {
        if (item.product.id === id && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      });
      const { totalItems, totalPrice } = calculateCartTotals(newItems);
      return { items: newItems, totalItems, totalPrice };
    }
    
    case 'CLEAR_CART':
      toast(`Cart cleared`);
      return initialState;
      
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    }
    return initialState;
  });
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, size, color } });
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
  };

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
