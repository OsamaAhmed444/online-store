import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
        ✓
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-6">
        Your order has been placed successfully and is being processed.
      </p>

      {order && (
        <div className="bg-gray-50 border p-4 rounded text-left mb-6 text-sm">
          <p className="font-semibold mb-1">Order ID: <span className="font-normal text-gray-700">{order.id || order._id || 'N/A'}</span></p>
          <p className="font-semibold mb-1">Total Amount: <span className="font-normal text-gray-700">${order.totalAmount || order.total || '0.00'}</span></p>
          <p className="font-semibold">Payment Status: <span className="font-normal text-green-600">Paid / Confirmed</span></p>
        </div>
      )}

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccessPage;