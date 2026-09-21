import React from "react";

function CartItem(props) {
  const item = props.item;
  const onIncrease = props.onIncrease;
  const onDecrease = props.onDecrease;
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

        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            className="w-8 h-8 border border-border rounded text-foreground hover:bg-surface-hover"
          >
            -
          </button>

          <span className="w-8 text-center text-foreground">{item.quantity}</span>

          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            className="w-8 h-8 border border-border rounded text-foreground hover:bg-surface-hover"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
        <p className="font-semibold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;