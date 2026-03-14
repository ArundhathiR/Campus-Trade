import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import "./Checkout.css";

function Checkout() {

  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expDate: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal + shipping;

  // Clear cart when order succeeds
  useEffect(() => {
    if (step === 3) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [step, setCart]);

  // SUCCESS PAGE
  if (step === 3) {
    return (
      <div className="checkout-success">
        <CheckCircle2 size={80} color="#22c55e" />
        <h1>Order Confirmed!</h1>
        <p>Your order for {cart.length} items is being processed.</p>

        <button
          onClick={() => navigate("/")}
          className="primary-btn"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* Step Indicator */}
        <div className="checkout-stepper">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            1. Shipping
          </div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            2. Payment
          </div>
        </div>

        <div className="checkout-layout">

          {/* LEFT SIDE FORM */}
          <div className="checkout-form-section">

            <button
              onClick={goBack}
              disabled={step === 1}
              className="back-link"
            >
              <ArrowLeft size={16} /> Back
            </button>

            {step === 1 ? (

              <form onSubmit={nextStep} className="checkout-form">

                <h3>
                  <Truck size={20}/> Shipping Information
                </h3>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  required
                  onChange={handleInputChange}
                />

                <div className="form-row">

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    required
                    onChange={handleInputChange}
                  />

                </div>

                <button
                  type="submit"
                  className="next-btn"
                >
                  Continue to Payment
                </button>

              </form>

            ) : (

              <form onSubmit={nextStep} className="checkout-form">

                <h3>
                  <CreditCard size={20}/> Payment Details
                </h3>

                <div className="payment-secure-badge">
                  <ShieldCheck size={16}/> Secure SSL Encrypted
                </div>

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (0000 0000 0000 0000)"
                  required
                  onChange={handleInputChange}
                />

                <div className="form-row">

                  <input
                    type="text"
                    name="expDate"
                    placeholder="MM/YY"
                    required
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    maxLength="3"
                    required
                    onChange={handleInputChange}
                  />

                </div>

                <button
                  type="submit"
                  className="next-btn"
                >
                  Place Order — ₹{grandTotal}
                </button>

              </form>

            )}

          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="checkout-summary">

            <h4>In Your Cart</h4>

            <div className="summary-items">

              {cart.map((item) => (
                <div key={item._id} className="summary-item">

                  <span>
                    {item.title} (x{item.quantity})
                  </span>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>

                </div>
              ))}

            </div>

            <hr/>

            <div className="summary-totals">

              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="total-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              <div className="total-row grand-total">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;