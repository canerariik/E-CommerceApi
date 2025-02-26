import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductDetails from './ProductDetails';

export default function App() {

  useEffect(() => {

  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}