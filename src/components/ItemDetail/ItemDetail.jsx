import React from 'react';

const ItemDetail = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p>${item.price}</p>
    </div>
  );
};

export default ItemDetail;
