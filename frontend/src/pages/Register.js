import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader2 } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",  
  });
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
      // THIS matches your backend exports.registerUser
      await axios.post(`${API_BASE_URL}/auth/register`, formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorBanner}>{error}</div>}
          
          <div style={styles.inputGroup}>
            <User size={18} style={styles.icon} />
            <input name="name" placeholder="Full Name" required onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <Mail size={18} style={styles.icon} />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} style={styles.input} />
          </div>

          

          <div style={styles.inputGroup}>
            <Lock size={18} style={styles.icon} />
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} style={styles.input} />
          </div>

          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Use the same styles object from your Login.js here
const styles = { /* ... paste your Login.js styles here ... */ };

export default Register;