import React from 'react';
import CartItem from './CartItem'; // Asegúrate de tener este componente

const CartContainer = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartContainer;
