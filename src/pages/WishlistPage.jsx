import React, { useEffect, useState } from "react";
import WishlistItem from "../components/wishlist/WishlistItem";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import {
  getMyWishlist,
  removeFromWishlist,
  addToWishlist,
} from "../api/wishlistApi";
import { addCartItem } from "../api/cartApi";

function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [error, setError] = useState("");

  async function loadWishlist() {
    try {
      setLoading(true);
      setError("");
      const res = await getMyWishlist();
      const data = res.data;
      const list = data.items || data.wishlist || data.data || [];
      setItems(list);
    } catch (err) {
      setError("Failed to load wishlist");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    loadWishlist();
  }, []);

  function getItemId(item) {
    return item.productId || item.id || item.product?._id;
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

  async function handleMoveToCart(id) {
    try {
      await addCartItem({ productId: id, quantity: 1 });
      await removeFromWishlist(id);
      loadWishlist();
      alert("Moved to cart");
    } catch (err) {
      alert("Could not move to cart");
    }
  }

  function handleRemoveClick(id) {
    setItemToRemove(id);
    setShowModal(true);
  }

  async function confirmRemove() {
    try {
      await removeFromWishlist(itemToRemove);
      setShowModal(false);
      setItemToRemove(null);
      loadWishlist();
    } catch (err) {
      alert("Could not remove item");
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <p className="text-red-500">{error}</p>
        <button type="button" onClick={loadWishlist} className="mt-2 underline">
          Try again
        </button>
      </div>
    );
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
          const mappedItem = {
            id: getItemId(item),
            name: getItemName(item),
            price: getItemPrice(item),
            image: getItemImage(item),
          };

          return (
            <WishlistItem
              key={mappedItem.id}
              item={mappedItem}
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