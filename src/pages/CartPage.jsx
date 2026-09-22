import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponInput from "../components/cart/CouponInput";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
} from "../api/cartApi";

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [error, setError] = useState("");

  async function loadCart() {
    try {
      setLoading(true);
      setError("");
      const res = await getCart();
      const data = res.data;

      const cartItems = data.items || data.cartItems || data.data || [];
      setItems(cartItems);

      if (data.discount) {
        setDiscount(data.discount);
      }
    } catch (err) {
      setError("Failed to load cart");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    loadCart();
  }, []);

  async function handleIncrease(id) {
    const item = items.find(function (x) {
      return getItemId(x) === id;
    });
    if (!item) return;

    const newQty = (item.quantity || 1) + 1;

    try {
      await updateCartItem({
        productId: getItemId(item),
        quantity: newQty,
      });
      loadCart();
    } catch (err) {
      alert("Could not update quantity");
    }
  }

  async function handleDecrease(id) {
    const item = items.find(function (x) {
      return getItemId(x) === id;
    });
    if (!item) return;

    const currentQty = item.quantity || 1;
    if (currentQty <= 1) return;

    try {
      await updateCartItem({
        productId: getItemId(item),
        quantity: currentQty - 1,
      });
      loadCart();
    } catch (err) {
      alert("Could not update quantity");
    }
  }

  function handleRemoveClick(id) {
    setItemToRemove(id);
    setShowModal(true);
  }

  async function confirmRemove() {
    try {
      await removeCartItem(itemToRemove);
      setShowModal(false);
      setItemToRemove(null);
      loadCart();
    } catch (err) {
      alert("Could not remove item");
    }
  }

  async function handleApplyCoupon(code) {
    try {
      const res = await applyCoupon({ code: code });
      const data = res.data;
      if (data.discount) {
        setDiscount(data.discount);
      }
      loadCart();
    } catch (err) {
      alert("Invalid coupon");
    }
  }

  function handleCheckout() {
    navigate("/checkout");
  }

  function getItemId(item) {
    return item.product || item.productId || item.id || item._id;
  }

  function getItemName(item) {
    return item.name || item.productName || item.product?.name || "Product";
  }

  function getItemPrice(item) {
    return item.price || item.product?.price || 0;
  }

  function getItemImage(item) {
    return (
      item.image ||
      item.product?.image ||
      item.product?.thumbnail ||
      "https://via.placeholder.com/100"
    );
  }

  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    const price = getItemPrice(items[i]);
    const qty = items[i].quantity || 1;
    subtotal = subtotal + price * qty;
  }

  const total = subtotal - discount;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <p className="text-red-500">{error}</p>
        <button type="button" onClick={loadCart} className="mt-2 underline">
          Try again
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Cart</h1>
        <EmptyState
          title="Your cart is empty"
          message="Add some products to get started."
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(function (item) {
            const mappedItem = {
              id: getItemId(item),
              name: getItemName(item),
              price: getItemPrice(item),
              quantity: item.quantity || 1,
              image: getItemImage(item),
            };

            return (
              <CartItem
                key={mappedItem.id}
                item={mappedItem}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemoveClick}
              />
            );
          })}

          <CouponInput onApply={handleApplyCoupon} />
        </div>

        <div>
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            total={total < 0 ? 0 : total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {showModal ? (
        <Modal
          onClose={function () {
            setShowModal(false);
          }}
          onConfirm={confirmRemove}
          title="Remove item"
        >
          <p>Are you sure you want to remove this item?</p>
        </Modal>
      ) : null}
    </div>
  );
}

export default CartPage;