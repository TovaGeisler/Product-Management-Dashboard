// src/components/ProductItem.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct } from '../redux/productSlice';

const ProductItem = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(editProduct({ id: product.id, name, price }));
    setIsEditing(false);
  };

  return (
    <div className="product-item">
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{product.name}</span>
          <span>{product.price}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default ProductItem;