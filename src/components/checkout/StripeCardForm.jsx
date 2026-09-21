import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import useTheme from '../../hooks/useTheme';

const getCardElementOptions = (isDark) => ({
  style: {
    base: {
      color: isDark ? '#f5f5f6' : '#14171a',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: isDark ? '#9aa0a8' : '#5b6470',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
});

const StripeCardForm = ({ onChange }) => {
  const { isDark } = useTheme();

  return (
    <div className="p-4 border border-border rounded bg-muted mb-4">
      <label className="block text-sm font-medium text-foreground mb-2">
        Card Details
      </label>
      <div className="p-3 bg-surface border border-border rounded shadow-sm">
        <CardElement options={getCardElementOptions(isDark)} onChange={onChange} />
      </div>
    </div>
  );
};

export default StripeCardForm;
