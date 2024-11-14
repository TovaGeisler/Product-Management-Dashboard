import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useDispatch();
  
  // Extracts product data and status from Redux state
  const { items, status, error } = useSelector((state) => state.products);

  // Local state for managing category filter and pagination
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  // Fetches products on initial render or when status is 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Extracts unique categories from items to use in the filter dropdown
  const categories = ['All', ...new Set(items.map(product => product.category))];

  // Handles the category change and resets to the first page when changed
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Filters items based on the selected category
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(product => product.category === selectedCategory);

  // Applies pagination to the filtered items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  // Handles page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Retry fetch function for handling errors
  const retryFetch = () => {
    dispatch(fetchProducts());
  };

  // Loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Error state with retry option
  if (status === 'failed') {
    return (
      <div>
        <div>Error: {error}</div>
        <button onClick={retryFetch}>Retry</button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Product List</h2>

      {/* Category Filter */}
      <div className="filter">
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display Products */}
      <div className="products">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
