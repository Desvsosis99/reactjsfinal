import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div>
      <p>El carrito está vacío</p>
      <Link to="/">Volver a la tienda</Link>
    </div>
  );
};

export default CartEmpty;
