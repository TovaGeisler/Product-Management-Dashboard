// src/pages/Dashboard.js

import React from 'react';
import ProductList from '../components/ProductList';
import './Dashboard.css'; // Page-specific styles

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Product Management Dashboard</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default Dashboard;