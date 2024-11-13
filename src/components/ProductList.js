// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      {Array.isArray(items) && items.length > 0 ? (
        items.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <div>No products available</div>  // Show a fallback message if no products
      )}
    </div>
  );
};

export default ProductList;