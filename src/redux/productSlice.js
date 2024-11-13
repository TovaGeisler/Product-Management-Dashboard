import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsApi } from '../utils/api';

// Async action to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await fetchProductsApi();
    // Ensure response data is in the correct format
    debugger; // Execution will pause here
    console.log(response.data);
    if (!response || !response.data) {
      throw new Error('No products data found');
    }
    return response.data;  // Assuming response.data is an array of products
  } catch (error) {
    // Handle any errors, including network or API issues
    throw new Error(error.message || 'Failed to fetch products');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],  // Default to an empty array
    status: 'idle',
    error: null,
  },
  reducers: {
    editProduct: (state, action) => {
      const { id, name, price } = action.payload;
      const existingProduct = state.items.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products || []; // Access the "products" array directly
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.items = [];  // Ensure items is reset to an empty array on error
      });
  },
});

export const { editProduct } = productSlice.actions;

export default productSlice.reducer;
