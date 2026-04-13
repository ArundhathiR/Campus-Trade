import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, loadCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      loadCart(user._id);
    }
  }, [user, loadCart]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;

  const formatINR = (num) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

  if (cart.length === 0) {
    return (
      <div className="cart-empty container">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4 shadow-aurora">
            <ShoppingBag size={48} className="text-purple-500" />
          </div>
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-800">Your cart feels light</h2>
        <p className="text-slate-500 text-lg mb-4">Add some gear to get ready for the semester</p>
        <button onClick={() => navigate("/")} className="btn-aurora text-lg shadow-aurora-lg">
          <span>Explore Gear</span>
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <motion.h2 className="cart-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Your Cart <span className="text-purple-500">({cart.length})</span>
      </motion.h2>

      <div className="cart-layout">
        <div className="cart-items">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div
                className="cart-card aurora-card"
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="cart-img-wrap">
                  <img
                    src={item.image
                      ? item.image.startsWith('http')
                        ? item.image
                        : `http://localhost:5000/${item.image.replace(/^\//, '')}`
                      : "https://images.unsplash.com/photo-1510255269784-06d274dc5942?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={item.title}
                  />
                </div>

                <div className="cart-item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-unit-price">{formatINR(item.price)}</p>

                  <div className="item-actions">
                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item._id)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item._id)}><Plus size={14} /></button>
                    </div>

                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="item-total-price">
                  {formatINR(item.price * item.quantity)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div className="cart-summary aurora-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-semibold text-slate-700">{formatINR(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span className="text-slate-500">Shipping</span>
            <span className={shipping === 0 ? "text-emerald-500 font-bold" : "font-semibold text-slate-700"}>
              {shipping === 0 ? "FREE" : formatINR(shipping)}
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span className="text-slate-800">Total</span>
            <span className="total-price">{formatINR(total)}</span>
          </div>

          <button className="btn-aurora w-full checkout-btn shadow-aurora-lg" onClick={() => navigate("/checkout")}>
            <span>Proceed to Checkout</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Cart;