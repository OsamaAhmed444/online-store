import React, { createContext, useEffect, useState } from "react";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon,
  clearCart,
} from "../api/cartApi";

export const cartContext1 = createContext();
export default function CartContext({ children }) {
  const [cart, setCart] = useState({});
  const [itemCount, setItemCount] = useState(0);

  const refreshCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
      setItemCount(response.data.itemCount);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addItemToCart = async (productId, quantity) => {
    try {
      const response = await addCartItem({ productId, quantity });
      setCart(response.data);
      setItemCount(response.data.itemCount);
    } catch (error) {
      throw error;
    }
  };

  const updateItemQuantity = async (productId, quantity) => {
    try {
      const response = await updateCartItem({ productId, quantity });
      setCart(response.data);
      setItemCount(response.data.itemCount);
    } catch (error) {
      throw error;
    }
  };

  const deleteItemFromCart = async (productId) => {
    try {
      const response = await removeCartItem(productId);
      setCart(response.data);
      setItemCount(response.data.itemCount);
    } catch (error) {
      throw error;
    }
  };

  const applyCopunCart = async (copun) => {
    try {
      const response = await applyCoupon({ code: copun });
      setCart(response.data);
      setItemCount(response.data.itemCount);
    } catch (error) {
      throw error;
    }
  };

  const removeCopunCart = async () => {
    try {
      const response = await removeCoupon();
      setCart(response.data);
      setItemCount(response.data.itemCount);
    } catch (error) {
      throw error;
    }
  };

  const removeItemCart = async () => {
    try {
      await clearCart();
      setCart({});
      setItemCount(0);
    } catch (error) {
      throw error;
    }
  };

  return (
    <cartContext1.Provider
      value={{
        cart,
        itemCount,
        refreshCart,
        addItemToCart,
        updateItemQuantity,
        deleteItemFromCart,
        applyCopunCart,
        removeCopunCart,
        removeItemCart,
      }}
    >
      {children}
    </cartContext1.Provider>
  );
}
