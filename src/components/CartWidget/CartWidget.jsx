import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
  const { items } = useContext(CartContext);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  
  return <div>{totalItems}</div>;
};

export default CartWidget;
