import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>

      {/* Navbar appears on every page */}
      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Seller Pages */}
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/my-products" element={<MyProducts />} />

        {/* Product Page */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>

    </Router>
  );
}

export default App;