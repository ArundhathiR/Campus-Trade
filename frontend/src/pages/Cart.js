import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, loadCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // Reload cart when user logs in
  useEffect(() => {
    if (user && user._id) {
      loadCart(user._id);
    }
  }, [user, loadCart]);

  // Calculate totals from cart.items (which come from backend)
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => {
    const product = item.productId;
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  if (items.length === 0) {
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
            {items.map((item) => {
              const product = item.productId;
              const productId = product?._id || product?.id;

              return (
                <div className="cart-item-card" key={productId}>
                  <div className="cart-img-wrapper">
                    <img
                      src={
                        product?.image
                          ? product.image
                          : "https://via.placeholder.com/100"
                      }
                      alt={product?.title || "Product"}
                    />
                  </div>

                  <div className="cart-item-info">
                    <h3>{product?.title}</h3>
                    <p className="unit-price">
                      {formatINR(product?.price || 0)}
                    </p>

                    <div className="cart-item-actions">
                      <div className="qty-selector">
                        <button onClick={() => decreaseQty(productId)}>
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQty(productId)}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        className="remove-icon-btn"
                        onClick={() => removeFromCart(productId)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-final-price">
                    {formatINR((product?.price || 0) * item.quantity)}
                  </div>
                </div>
              );
            })}
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

            {/* CHECKOUT BUTTON */}
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
