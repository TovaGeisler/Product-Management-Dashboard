// src/components/ProductItem.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct } from '../redux/productSlice';

const ProductItem = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const dispatch = useDispatch();

  // Handle save when editing is done
  const handleSave = () => {
    dispatch(editProduct({ id: product.id, name, price }));
    setIsEditing(false);
  };

  return (
    <div className="product-item">
      {isEditing ? (
        <div className="product-edit">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Product name"
          />
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Product price"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Status: {product.availability}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;