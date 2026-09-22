import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center min-h-screen bg-background text-foreground">
      <div className="w-16 h-16 bg-green-500/15 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
        ✓
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">Thank You for Your Order!</h1>
      <p className="text-muted-foreground mb-6">
        Your order has been placed successfully and is being processed.
      </p>

      {order && (
        <div className="bg-surface border border-border p-4 rounded text-left mb-6 text-sm">
          <p className="font-semibold mb-1">Order ID: <span className="font-normal text-muted-foreground">{order._id || order.id || 'N/A'}</span></p>
          <p className="font-semibold mb-1">Total Amount: <span className="font-normal text-muted-foreground">${(order.totalPrice ?? order.totalAmount ?? order.total ?? 0).toFixed ? (order.totalPrice ?? order.totalAmount ?? order.total ?? 0).toFixed(2) : (order.totalPrice ?? order.totalAmount ?? order.total ?? '0.00')}</span></p>
          <p className="font-semibold">
            Payment Status:{' '}
            <span
              className={
                order.paymentStatus === 'paid'
                  ? 'font-normal text-green-500'
                  : 'font-normal text-yellow-500'
              }
            >
              {order.paymentStatus === 'paid'
                ? 'Paid'
                : order.paymentMethod === 'cash'
                ? 'Pending (Cash on Delivery)'
                : 'Pending'}
            </span>
          </p>
        </div>
      )}

      <Link
        to="/"
        className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:bg-primary-hover transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccessPage;