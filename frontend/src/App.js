import "./App.css";
import React, { useEffect, useContext } from "react";
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

import { CartContext } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user } = useContext(AuthContext);
  const { loadCart } = useContext(CartContext);

  useEffect(() => {

    if (user && user._id) {
      loadCart(user._id);
    }

  }, [user, loadCart]);

  return (
    <Router>

      {/* Navbar appears on every page */}
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/my-products" element={<MyProducts />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>

    </Router>
  );
}

export default App;