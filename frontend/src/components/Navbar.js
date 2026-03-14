import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">CampusTrade</Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        {token && (
          <li>
            <Link to="/seller">Seller Dashboard</Link>
          </li>
        )}

        {!token ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
        <Link to="/cart">Cart</Link>

      </ul>

    </nav>
  );
};

export default Navbar;