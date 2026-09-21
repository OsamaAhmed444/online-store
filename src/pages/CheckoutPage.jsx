import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/checkout/AddressForm';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleAddressSubmit = (shippingData) => {
    
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
    navigate('/payment');
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-background text-foreground">
      <AddressForm onSubmit={handleAddressSubmit} />
    </div>
  );
};

export default CheckoutPage;