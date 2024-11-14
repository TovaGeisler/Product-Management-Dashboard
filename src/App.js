// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
//handel errors in the to catch component errors and show a fallback UI
const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;