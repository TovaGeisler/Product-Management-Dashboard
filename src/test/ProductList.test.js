// src/__tests__/ProductList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fetchProducts } from '../redux/productSlice';
import ProductList from '../components/ProductList';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);
const mockProducts = [
  { id: 1, name: 'Product 1', price: 10, category: 'category1' },
  { id: 2, name: 'Product 2', price: 20, category: 'category2' },
];

describe('ProductList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: [],
        status: 'idle',
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders loading message when products are being fetched', () => {
    store = mockStore({
      products: {
        items: [],
        status: 'loading',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders product items when products are fetched successfully', async () => {
    store = mockStore({
      products: {
        items: mockProducts,
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    for (const product of mockProducts) {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    }
  });

  test('renders error message when product fetch fails', () => {
    store = mockStore({
      products: {
        items: [],
        status: 'failed',
        error: 'Failed to fetch products',
      },
    });   

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
  });
});
