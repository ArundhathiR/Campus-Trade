import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {

  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-grid">

          {cart.map((item) => {

            const imageUrl = item.image
              ? `http://localhost:5000/${item.image}`
              : "https://via.placeholder.com/200";

            return (
              <div className="cart-card" key={item._id}>

                <img src={imageUrl} alt={item.title} />

                <h3>{item.title}</h3>

                <p>₹{item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>

              </div>
            );
          })}

        </div>
      )}

      <h3 className="cart-total">Total: ₹{total}</h3>

    </div>
  );
}

export default Cart;