import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">CampusTrade</Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        {user && (
          <li>
            <Link to="/seller">Seller Dashboard</Link>
          </li>
        )}

        {!user ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}

        <li>
          <Link to="/cart">Cart</Link>
        </li>

      </ul>

    </nav>
  );
};

export default Navbar;