import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ fullName: "", address: "", city: "", zipCode: "", cardNumber: "", expDate: "", cvv: "" });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const nextStep = (e) => { e.preventDefault(); setStep((prev) => prev + 1); };
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal + shipping;

  useEffect(() => {
    if (step === 3) clearCart();
  }, [step, clearCart]);

  if (step === 3) {
    return (
      <div className="checkout-success container">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="mb-6 shadow-aurora-lg rounded-full">
          <CheckCircle2 size={100} className="text-emerald-500 bg-white rounded-full" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl font-extrabold text-slate-800 mb-4">
          Order Confirmed!
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-slate-600 mb-10 max-w-md">
          Your gear is on the way. Check your email for tracking details. 🎉
        </motion.p>
        <motion.button onClick={() => navigate("/")} className="btn-aurora text-lg shadow-aurora-lg px-10 py-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Sparkles size={20} />
          <span>Back to Explore</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      {/* Stepper */}
      <div className="checkout-stepper">
        <div className={`step-item ${step >= 1 ? "step-active" : ""}`}>
          <div className="step-circle"><Truck size={20} /></div>
          <span>Shipping</span>
        </div>
        <div className="step-line"><div className={`step-line-fill ${step >= 2 ? "filled" : ""}`}></div></div>
        <div className={`step-item ${step >= 2 ? "step-active" : ""}`}>
          <div className="step-circle"><CreditCard size={20} /></div>
          <span>Payment</span>
        </div>
      </div>

      <div className="co-layout">
        <motion.div className="co-form-section aurora-card" key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <button onClick={goBack} disabled={step === 1} className="co-back-link">
            <ArrowLeft size={16} /> <span>Back</span>
          </button>

          {step === 1 ? (
            <form onSubmit={nextStep} className="co-form">
              <h3><Truck className="text-blue-500" size={24} /> <span>Shipping Information</span></h3>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="fullName" placeholder="Full Name" required onChange={handleInputChange} className="aurora-input pl-12" />
              </div>
              <div className="relative">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="address" placeholder="Street Address" required onChange={handleInputChange} className="aurora-input pl-12" />
              </div>
              <div className="flex gap-4">
                <input type="text" name="city" placeholder="City" required onChange={handleInputChange} className="aurora-input w-2/3" />
                <input type="text" name="zipCode" placeholder="ZIP" required onChange={handleInputChange} className="aurora-input w-1/3" />
              </div>
              <button type="submit" className="btn-aurora w-full py-4 mt-4 text-lg">Continue to Payment <ArrowRight size={20} /></button>
            </form>
          ) : (
            <form onSubmit={nextStep} className="co-form">
              <h3><CreditCard className="text-purple-500" size={24} /> <span>Payment Details</span></h3>
              <div className="secure-badge"><ShieldCheck size={18} /> <span>Secure SSL Encrypted Checkout</span></div>
              <input type="text" name="cardNumber" placeholder="Card Number (0000 0000 0000 0000)" required onChange={handleInputChange} className="aurora-input" />
              <div className="flex gap-4">
                <input type="text" name="expDate" placeholder="MM/YY" required onChange={handleInputChange} className="aurora-input w-1/2" />
                <input type="password" name="cvv" placeholder="CVV" maxLength="3" required onChange={handleInputChange} className="aurora-input w-1/2" />
              </div>
              <button type="submit" className="btn-aurora w-full py-4 mt-4 text-lg">Place Order — ₹{grandTotal}</button>
            </form>
          )}
        </motion.div>

        {/* Right Summary */}
        <motion.div className="co-summary aurora-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h4 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">In Your Bag</h4>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center text-slate-700 font-medium">
                <span className="truncate max-w-[70%]">{item.title} <span className="text-purple-500 ml-1">×{item.quantity}</span></span>
                <span className="font-bold text-slate-800">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between mb-2 text-slate-600"><span className="font-medium">Subtotal</span><span className="font-bold text-slate-800">₹{subtotal}</span></div>
            <div className="flex justify-between mb-4 text-slate-600"><span className="font-medium">Shipping</span><span className="font-bold text-emerald-500">{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            <div className="flex justify-between pt-4 border-t border-slate-200 text-slate-800 text-xl font-extrabold"><span>Total</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">₹{grandTotal}</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;