import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // We'll add some basic styling next

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">CampusTrade</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/seller">Seller Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;