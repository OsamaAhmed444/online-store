import React from "react";

function CartSummary(props) {
  const subtotal = props.subtotal || 0;
  const discount = props.discount || 0;
  const total = props.total || 0;
  const onCheckout = props.onCheckout;

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Discount</span>
        <span className="text-green-600">-${discount.toFixed(2)}</span>
      </div>

      <div className="border-t my-3"></div>

      <div className="flex justify-between font-semibold mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="w-full py-2 bg-blue-600 text-white rounded text-sm"
      >
        Checkout
      </button>
    </div>
  );
}

export default CartSummary;