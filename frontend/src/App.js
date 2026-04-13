import "./App.css";
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

const pageTransition = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }
  }
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route path="/seller" element={<AnimatedPage><SellerDashboard /></AnimatedPage>} />
        <Route path="/my-products" element={<AnimatedPage><MyProducts /></AnimatedPage>} />
        <Route path="/product/:id" element={<AnimatedPage><ProductDetails /></AnimatedPage>} />
        <Route path="/cart" element={<AnimatedPage><Cart /></AnimatedPage>} />
        <Route path="/checkout" element={<AnimatedPage><Checkout /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

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
      <div className="app-wrapper">
        {/* Animated Aurora Background */}
        <div className="aurora-bg">
          <div className="aurora-orb aurora-orb-1"></div>
          <div className="aurora-orb aurora-orb-2"></div>
          <div className="aurora-orb aurora-orb-3"></div>
          <div className="aurora-orb aurora-orb-4"></div>
        </div>

        <Navbar />

        <div className="page-content">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;