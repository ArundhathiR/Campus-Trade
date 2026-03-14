import React, { useState } from "react";
import axios from "axios";
import MyProducts from "./MyProducts";
import "./Form.css";

const SellerDashboard = () => {
  // 1. State: Removed description
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: null
  });
  const [preview, setPreview] = useState(null);

  // 2. Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle image selection
  const handleFileChange = (e) => {

  const file = e.target.files[0];

  setFormData({ ...formData, image: file });

  if (file) {
    setPreview(URL.createObjectURL(file));
  }

};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    // Setting a default description so the backend doesn't complain
    data.append("description", "No description provided"); 
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/products",
        data,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data" 
          }
        }
      );

      console.log("Product created:", response.data);
      alert("Product created successfully!");
      
      // Reset form
      setFormData({ title: "", price: "", category: "", image: null });
      
    } catch (error) {
      console.error("Error creating product:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired. Please login again.");
        } else {
          alert(`Server Error: ${error.response.data.message || "Something went wrong"}`);
        }
      } else if (error.request) {
        alert("Cannot reach the server. Please ensure your Backend is running on port 5000.");
      } else {
        alert(`Error: ${error.message}`);
      }
    } // FIXED: Extra brace removed from here
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center mb-20">List a New Product</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Title</label>
            <input 
              name="title"
              type="text" 
              className="form-input" 
              placeholder="e.g. Engineering Graphics Set" 
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input 
              name="price"
              type="number" 
              className="form-input" 
              value={formData.price}
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" className="form-input" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Lab Gear">Lab Gear</option>
            </select>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <label className="file-upload-btn">
              <span>{formData.image ? formData.image.name : "+ Click to upload photo"}</span>
              <input 
                type="file" 
                className="hidden-input" 
                onChange={handleFileChange}
                accept="image/*"
              />
              {preview && (
                <img
                src={preview}
                alt="Preview"
                style={{
                width: "200px",
                marginTop: "10px",
                borderRadius: "8px"
                }}
              />
)}
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
            Post Advertisement
          </button>
        </form>
      </div>

      <div className="mt-20">
        <hr />
        <h3 className="text-center mt-20">Your Active Listings</h3>
        <MyProducts />
      </div>
    </div>
  );
};

export default SellerDashboard;