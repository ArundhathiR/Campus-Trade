import React, { useEffect, useState } from "react";
import axios from "axios";

// Added refreshTrigger as a prop to allow automatic updates from the Dashboard
function MyProducts({ refreshTrigger }) {
  const [products, setProducts] = useState([]);

  // Fetch seller products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // If no token is found, we shouldn't even try to fetch
      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/products/my-products",
        {
          headers: {
            // ✅ Fix: Added "Bearer " prefix to match authMiddleware requirements
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // useEffect now runs on mount AND whenever refreshTrigger changes
  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            // ✅ Fix: Added "Bearer " prefix here as well
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product deleted");
      fetchProducts(); // refresh list after deletion
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No products listed yet.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.title}
              width="80"
              height="80"
              style={{ objectFit: "cover", borderRadius: "4px" }}
            />

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0" }}>{product.title}</h4>
              <p style={{ margin: 0, fontWeight: "bold", color: "#2c3e50" }}>₹{product.price}</p>
              <small style={{ color: "#7f8c8d" }}>{product.category}</small>
            </div>

            <button
              onClick={() => handleDelete(product._id)}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyProducts;