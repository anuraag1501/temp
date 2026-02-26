import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './screens/home/Home';

import './styles/App.css';
import Product from './screens/product/Product';
import Pricing from './screens/pricing/Pricing';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Redirect to Home if no route matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
