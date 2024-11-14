// src/__tests__/ProductItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductItem from '../components/ProductItem';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);
const mockProduct = { id: 1, name: 'Product 1', price: 10, category: 'category1' };

describe('ProductItem Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  test('renders product item details', () => {
    render(
      <Provider store={store}>
        <ProductItem product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  test('triggers edit product action when editing product', () => {
    render(
      <Provider store={store}>
        <ProductItem product={mockProduct} />
      </Provider>
    );

    // Simulate user changing the product name
    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);
    const nameInput = screen.getByDisplayValue(mockProduct.name);
    fireEvent.change(nameInput, { target: { value: 'Updated Product Name' } });

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
