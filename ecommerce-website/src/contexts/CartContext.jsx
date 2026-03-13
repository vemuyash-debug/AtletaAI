
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from "sonner";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const calculateCartTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state, action) => {
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

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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

  const addToCart = (product, quantity, size, color) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, size, color } });
  };

  const removeFromCart = (id, size, color) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
  };

  const updateQuantity = (id, size, color, quantity) => {
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
