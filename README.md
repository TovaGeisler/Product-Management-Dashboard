

# Product Management Dashboard

## Overview

This is a product management dashboard built with React and Redux Toolkit. The app allows users to:
- View a list of products with pagination
- Filter products dynamically
- Edit product names and prices inline
- Handle conflict resolution during editing
- Cache data between page loads

## Features

1. **Product List with Dynamic Filtering and Pagination**
   - Products are fetched from a mock API.
   - Pagination and filtering are memoized to improve performance.

2. **Inline Editing with Conflict Resolution**
   - Users can edit product names and prices directly in the list.
   - Optimistic updates are shown immediately on the UI.
   - Basic conflict handling alerts the user if there are conflicting changes.

3. **State Management and Caching**
   - The app uses Redux Toolkit for centralized state management.
   - A caching strategy is implemented to persist data between page loads.

4. **Error Handling**
   - An error boundary is implemented to catch component errors.
   - Users can retry fetching products in case of network errors.

5. **Performance Optimization**
   - Memoization techniques are used to reduce unnecessary re-renders.
   - Components are lazy-loaded to improve the app's load time.

## Setup & Run Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/product-dashboard.git
   cd product-dashboard
