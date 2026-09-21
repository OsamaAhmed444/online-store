import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import PaymentMethodSelector from '../components/checkout/PaymentMethodSelector';
import StripeCardForm from '../components/checkout/StripeCardForm';
import { placeOrder } from '../api/ordersApi';
import { useCart } from '../hooks/useCart';

const PaymentPage = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { cart, removeItemCart } = useCart();
  const cartItems = cart?.items || [];

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCardComplete, setIsCardComplete] = useState(false);

  const handleCardChange = (event) => {
    setIsCardComplete(event.complete);
    if (event.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage('');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');

    try {
      if (paymentMethod === 'stripe') {
        if (!stripe || !elements) {
          setIsProcessing(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);
        // يمكنك هنا جلب clientSecret من الـ backend لو متوفر، أو عمل Confirm مباشرة
        const { error, paymentMethod: stripeMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          setErrorMessage(error.message);
          setIsProcessing(false);
          return;
        }
      }

      // إنشاء الطلب عبر API
      const orderData = {
        items: cartItems,
        shippingAddress,
        paymentMethod,
      };

      const createdOrder = await placeOrder(orderData);

      // مسح السلة والتنقل لصفحة النجاح
      await removeItemCart();
      localStorage.removeItem('shippingAddress');
      navigate('/order-success', { state: { order: createdOrder?.data } });

    } catch (err) {
      setErrorMessage(err.message || 'حدث خطأ أثناء إتمام الطلب، برجاء المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4 bg-surface border border-border text-foreground rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

      {errorMessage && (
        <div className="p-3 mb-4 bg-red-500/10 text-red-400 border border-red-500/30 rounded text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePaymentSubmit}>
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
        />

        {paymentMethod === 'stripe' && (
          <StripeCardForm onChange={handleCardChange} />
        )}

        <button
          type="submit"
          disabled={isProcessing || (paymentMethod === 'stripe' && (!stripe || !isCardComplete))}
          className="w-full bg-primary text-primary-foreground py-3 rounded font-semibold hover:bg-primary-hover transition disabled:opacity-50"
        >
          {isProcessing ? 'Processing Payment...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;