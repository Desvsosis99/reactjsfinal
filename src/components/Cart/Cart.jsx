import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartContainer from './CartContainer';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const { items } = useContext(CartContext);
  return items.length > 0 ? <CartContainer items={items} /> : <CartEmpty />;
};

export default Cart;
