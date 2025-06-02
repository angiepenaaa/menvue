import React, { createContext, useContext, useState, useCallback } from 'react';
import type { MenuItem, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, removedIngredients: string[] = [], quantity = 1, specialInstructions?: string) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.removedIngredients.sort()) === JSON.stringify(removedIngredients.sort()) &&
        i.specialInstructions === specialInstructions
      );

      if (existingItemIndex > -1) {
        return currentItems.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      return [...currentItems, { ...item, quantity, removedIngredients, specialInstructions }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal
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