import React, { useState } from "react";
import axios from "axios";
import CreateProduct from "../components/CreateProduct"; // Keep these for later use
import MyProducts from "../components/MyProducts";
import "./Form.css";

const SellerDashboard = () => {
  // 1. State to store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null
  });

  // 2. Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle image selection
  const handleFileChange = (e) => {
  setFormData({ ...formData, image: e.target.files[0] });
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Change the name here to 'data' to avoid confusion with the state 'formData'
  const data = new FormData();
  
  // Now we pull from the STATE (formData) and put it into the data object
  data.append("title", formData.title);
  data.append("description", formData.description); // Don't forget this!
  data.append("price", formData.price);
  data.append("category", formData.category);
  data.append("image", formData.image);

  try {
    const response = await axios.post("http://localhost:5000/api/products", data);
    console.log("Product created:", response.data);
    alert("Product created successfully!");
    
    // Optional: Refresh or redirect
    // window.location.reload(); 
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Check your server—it might not be running on port 5000.");
  }
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
              onChange={handleChange}
            />
          </div>

         <div className="form-group">
  <label>Price (₹)</label>
  <input 
    name="price"
    type="number" 
    className="form-input" 
    onChange={handleChange} 
  />
</div>

<div className="form-group">
  <label>Category</label>
  <select name="category" className="form-input" onChange={handleChange}>
    <option value="">Select Category</option>
    <option value="Books">Books</option>
    <option value="Electronics">Electronics</option>
    <option value="Lab Gear">Lab Gear</option>
  </select>
</div>

          <div className="form-group">
            <label>Product Image</label>
            <label className="file-upload-btn">
              {/* Show the file name if a file is selected */}
              <span>{formData.image ? formData.image.name : "+ Click to upload photo"}</span>
              <input 
                type="file" 
                className="hidden-input" 
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
            Post Advertisement
          </button>
        </form>
      </div>

      {/* 4. Displaying your products below the form */}
      <div className="mt-20">
        <hr />
        <h3 className="text-center mt-20">Your Active Listings</h3>
        <MyProducts />
      </div>
    </div>
  );
};

export default SellerDashboard;
