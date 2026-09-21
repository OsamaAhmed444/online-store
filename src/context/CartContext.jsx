import React, { createContext, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // بيانات وهمية تجريبية
  const cartCount = 0; // عدد العناصر في السلة للتجربة

  return (
    <CartContext.Provider value={{ cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // قيمة احتياطية في حال لم يتم تغليف التطبيق بـ Provider
    return { cartCount: 0 };
  }
  return context;
};