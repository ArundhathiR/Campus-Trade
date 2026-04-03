import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setShowProfileMenu(false);
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

        {user && (
          <li>
            <Link to="/seller">Seller Dashboard</Link>
          </li>
        )}

        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        {user && (
          <li className="profile-menu">
            <button
              className="profile-icon-btn"
              onClick={toggleProfileMenu}
              aria-label="Open profile menu"
            >
              <span className="profile-icon">&#128100;</span>
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <p className="profile-name">{user.name}</p>
                <p className="profile-email">{user.email}</p>

                <Link
                  to="/my-products"
                  onClick={() => setShowProfileMenu(false)}
                >
                  My Products
                </Link>
                <Link to="/seller" onClick={() => setShowProfileMenu(false)}>
                  Seller Dashboard
                </Link>
                <button className="dropdown-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
