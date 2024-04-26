import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleAdd = () => {
    if (count < stock) {
      setCount(count + 1);
      onAdd(count + 1);
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>Agregar</button>
      <p>Cantidad: {count}</p>
    </div>
  );
};

export default ItemCount;
