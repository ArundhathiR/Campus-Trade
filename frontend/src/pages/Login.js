import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // ✅ add this

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { loadCart } = useContext(CartContext); // ✅ get loadCart

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = React.useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData
      );

      const { token, user } = response.data;

      login(user, token);

      // ✅ Load user's cart instantly
      loadCart(user._id);

      navigate("/seller");

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Invalid credentials. Please try again.";

      setError(message);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Log in to manage your trade</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorBanner}>{error}</div>}

          <div style={styles.inputGroup}>
            <Mail size={18} style={styles.icon} />
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock size={18} style={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <Loader2 className="spinner-icon" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p
          onClick={() => navigate("/register")}
          style={styles.registerLink}
        >
          Don't have an account?{" "}
          <span style={styles.linkText}>Register here.</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7f6",
  },
  card: {
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    margin: "0 0 24px",
    color: "#666",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: "12px",
    color: "#999",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
  },
  errorBanner: {
    padding: "10px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  registerLink: {
    marginTop: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    cursor: "pointer",
  },
  linkText: {
    color: "#007bff",
    fontWeight: "600",
  },
};

export default Login;