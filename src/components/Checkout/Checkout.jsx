import React from 'react';
import CheckoutOrderList from './CheckoutOrderList';
import CheckoutLoader from './CheckoutLoader';

const Checkout = () => {
  return (
    <div>
      <CheckoutLoader />
      <CheckoutOrderList />
    </div>
  );
};

export default Checkout;
