import React from "react";

function CartItem(props) {
  const item = props.item;
  const onIncrease = props.onIncrease;
  const onDecrease = props.onDecrease;
  const onRemove = props.onRemove;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-white">
      <img
        src={item.image}
        alt={item.name}
        className="w-full sm:w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">${item.price}</p>

        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            className="w-8 h-8 border rounded text-gray-700"
          >
            -
          </button>

          <span className="w-8 text-center">{item.quantity}</span>

          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            className="w-8 h-8 border rounded text-gray-700"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
        <p className="font-semibold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;