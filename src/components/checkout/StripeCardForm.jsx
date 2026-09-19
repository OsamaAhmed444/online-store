import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCardForm = ({ onChange }) => {
  return (
    <div className="p-4 border rounded bg-gray-50 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Card Details
      </label>
      <div className="p-3 bg-white border rounded shadow-sm">
        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={onChange} />
      </div>
    </div>
  );
};

export default StripeCardForm;