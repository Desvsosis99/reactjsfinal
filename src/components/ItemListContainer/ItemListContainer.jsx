import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';

const ItemListContainer = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Aquí deberías cargar los items según la categoría
    setItems(/* array de productos */);
  }, [category]);

  return <ItemList items={items} />;
};

export default ItemListContainer;
