
// src/utils/api.js
import axios from 'axios';

// Function to fetch products (mock or replace with an actual API endpoint)
export const fetchProductsApi = async () => {
  try {
    
     return  await axios.get('http://localhost:5000/products');
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};