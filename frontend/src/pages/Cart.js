import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <ShoppingBag size={64} color="#ccc" />
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")} className="shop-now-btn">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Your Shopping Cart</h2>

        <div className="cart-layout">

          {/* List of items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item-card" key={item._id}>

                <div className="cart-img-wrapper">
                  <img
                    src={
                      item.image
                        ? `http://localhost:5000/${item.image}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={item.title}
                  />
                </div>

                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p className="unit-price">{formatINR(item.price)}</p>

                  <div className="cart-item-actions">
                    <div className="qty-selector">
                      <button onClick={() => decreaseQty(item._id)}>
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQty(item._id)}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      className="remove-icon-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-final-price">
                  {formatINR(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatINR(shipping)}</span>
            </div>

            <div className="summary-line total">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>

            {/* UPDATED BUTTON */}
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;