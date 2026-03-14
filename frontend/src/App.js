import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import Login from "./pages/Login";
import Register from "./pages/Register"; // 1. Added this import
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* 2. Clean Route */}
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;