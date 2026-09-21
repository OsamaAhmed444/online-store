import React, { useState } from 'react';

const AddressForm = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    fullName: initialValues.fullName || '',
    address: initialValues.address || '',
    city: initialValues.city || '',
    postalCode: initialValues.postalCode || '',
    phone: initialValues.phone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-surface border border-border text-foreground rounded shadow">
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full border border-border bg-muted p-2 rounded text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border border-border bg-muted p-2 rounded text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border border-border bg-muted p-2 rounded text-foreground outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full border border-border bg-muted p-2 rounded text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-border bg-muted p-2 rounded text-foreground outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary-hover transition font-semibold"
      >
        Proceed to Payment
      </button>
    </form>
  );
};

export default AddressForm;