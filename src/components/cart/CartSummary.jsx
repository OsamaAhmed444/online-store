import React from "react";

function CartSummary(props) {
  const subtotal = props.subtotal || 0;
  const discount = props.discount || 0;
  const total = props.total || 0;
  const onCheckout = props.onCheckout;

  return (
    <div className="border border-border rounded-lg p-4 bg-surface text-foreground">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">Discount</span>
        <span className="text-green-500">-${discount.toFixed(2)}</span>
      </div>

      <div className="border-t border-border my-3"></div>

      <div className="flex justify-between font-semibold mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="w-full py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary-hover"
      >
        Checkout
      </button>
    </div>
  );
}

export default CartSummary;