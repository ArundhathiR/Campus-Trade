import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Loader2, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { loadCart } = useContext(CartContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      const { token, user } = response.data;
      login(user, token);
      loadCart(user._id);
      navigate("/seller");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">

      {/* Background decorations specific to Auth */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <motion.div
        className="aurora-card w-full max-w-md p-10 relative z-10"
        style={{ borderRadius: '30px' }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-aurora"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <KeyRound size={28} color="white" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500">Sign in to manage your campus trades</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              className="p-4 rounded-xl text-sm font-medium text-center bg-rose-50 text-rose-600 border border-rose-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {error}
            </motion.div>
          )}

          <div className="relative">
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="aurora-input pl-12"
            />
          </div>

          <div className="relative">
            <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="aurora-input pl-12 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition-colors bg-transparent border-none cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={isLoading} className="btn-aurora w-full py-4 text-lg">
            {isLoading ? <Loader2 className="spinner-icon" size={24} /> : <span>Dive In</span>}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500">
          New to CampusTrade?{" "}
          <span
            className="font-bold text-purple-600 cursor-pointer hover:text-purple-700 transition"
            onClick={() => navigate("/register")}
          >
            Create account
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;