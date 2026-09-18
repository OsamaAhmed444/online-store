import React, { useState } from "react";
import WishlistItem from "../components/wishlist/WishlistItem";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";

function WishlistPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Sample Wishlist Product",
      price: 40,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  function handleMoveToCart(id) {
    alert("Moved to cart: " + id);
    const newItems = items.filter(function (item) {
      return item.id !== id;
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

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <EmptyState
          title="Your wishlist is empty"
          message="Save products you like to find them later."
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="space-y-4">
        {items.map(function (item) {
          return (
            <WishlistItem
              key={item.id}
              item={item}
              onMoveToCart={handleMoveToCart}
              onRemove={handleRemoveClick}
            />
          );
        })}
      </div>

      {showModal ? (
        <Modal
          onClose={function () {
            setShowModal(false);
          }}
          onConfirm={confirmRemove}
          title="Remove item"
        >
          <p>Are you sure you want to remove this item from wishlist?</p>
        </Modal>
      ) : null}
    </div>
  );
}

export default WishlistPage;