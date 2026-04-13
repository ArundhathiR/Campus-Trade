import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Menu, X, LogOut, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavHeader from "./ui/nav-header";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/seller", label: "Dashboard" },
    { to: "/my-products", label: "Listings" },
  ];

  return (
    <div className="floating-nav-wrapper">
      <nav className="aurora-navbar-floating">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-icon">
              <Sparkles size={18} />
            </div>
            <span className="logo-text">CampusTrade</span>
          </Link>

          {/* Desktop Links - Using NavHeader Sliding Cursor */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <NavHeader links={navLinks} />
          </div>

          {/* Right */}
          <div className="nav-actions">
            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    className="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {!user ? (
              <Link to="/login" className="btn-aurora nav-signin-btn">
                <span>Sign In</span>
              </Link>
            ) : (
              <div className="nav-profile">
                <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                  <div className="avatar">
                    <User size={15} />
                  </div>
                  <span className="avatar-name">{user.name?.split(" ")[0]}</span>
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      className="dropdown aurora-card"
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="dropdown-item" onClick={() => { logout(); setProfileOpen(false); }}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button className="mobile-menu-btn block md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mobile-nav aurora-card"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="mobile-link" onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              ))}
              {!user ? (
                <Link to="/login" className="mobile-link" onClick={() => setMobileOpen(false)}>Sign In</Link>
              ) : (
                <button className="mobile-link" onClick={() => { logout(); setMobileOpen(false); }}>Sign Out</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;