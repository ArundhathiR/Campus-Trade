import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = "http://localhost:5000/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

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
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Sparkles size={28} color="white" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Join Today</h2>
          <p className="text-slate-500">Create an account to start trading</p>
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
            <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="aurora-input pl-12"
            />
          </div>

          <div className="relative">
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
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
              type="password"
              name="password"
              placeholder="Create Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="aurora-input pl-12"
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn-aurora w-full py-4 text-lg">
            {isLoading ? <Loader2 className="spinner-icon" size={24} /> : <span>Register Now</span>}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500">
          Already a member?{" "}
          <span
            className="font-bold text-purple-600 cursor-pointer hover:text-purple-700 transition"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;