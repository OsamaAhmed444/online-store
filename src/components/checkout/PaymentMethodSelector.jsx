import React from 'react';

const PaymentMethodSelector = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="space-y-3 mb-6">
      <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
      <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
        <input
          type="radio"
          name="paymentMethod"
          value="stripe"
          checked={selectedMethod === 'stripe'}
          onChange={(e) => onSelectMethod(e.target.value)}
          className="h-4 w-4 text-blue-600"
        />
        <span className="font-medium text-gray-700">Credit / Debit Card (Stripe)</span>
      </label>
      <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
        <input
          type="radio"
          name="paymentMethod"
          value="cod"
          checked={selectedMethod === 'cod'}
          onChange={(e) => onSelectMethod(e.target.value)}
          className="h-4 w-4 text-blue-600"
        />
        <span className="font-medium text-gray-700">Cash on Delivery (COD)</span>
      </label>
    </div>
  );
};

export default PaymentMethodSelector;