import React from "react";

function WishlistItem(props) {
  const item = props.item;
  const onMoveToCart = props.onMoveToCart;
  const onRemove = props.onRemove;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg bg-surface">
      <img
        src={item.image}
        alt={item.name}
        className="w-full sm:w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">${item.price}</p>
      </div>

      <div className="flex flex-row sm:flex-col gap-2">
        <button
          type="button"
          onClick={() => onMoveToCart(item.id)}
          className="px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary-hover"
        >
          Move to Cart
        </button>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="px-3 py-2 text-red-500 border border-border rounded text-sm hover:bg-surface-hover"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;