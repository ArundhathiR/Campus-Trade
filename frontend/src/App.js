import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;