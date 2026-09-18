import React, { useState } from "react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponInput from "../components/cart/CouponInput";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";

function CartPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Sample Product",
      price: 25,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  function handleIncrease(id) {
    const newItems = items.map(function (item) {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(newItems);
  }

  function handleDecrease(id) {
    const newItems = items.map(function (item) {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(newItems);
  }

  function handleRemoveClick(id) {
    setItemToRemove(id);
    setShowModal(true);
  }

  function confirmRemove() {
    const newItems = items.filter(function (item) {
      return item.id !== itemToRemove;
    });
    setItems(newItems);
    setShowModal(false);
    setItemToRemove(null);
  }

  function handleApplyCoupon(code) {
    if (code.toUpperCase() === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
  }

  function handleCheckout() {
    alert("Go to checkout");
  }

  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal = subtotal + items[i].price * items[i].quantity;
  }

  const total = subtotal - discount;
  if (total < 0) {
    // keep total from going negative
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
            return (
              <CartItem
                key={item.id}
                item={item}
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