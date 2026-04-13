import React, { useState } from "react";
import axios from "axios";
import MyProducts from "./MyProducts";
import { Upload, Package, DollarSign, Layers, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import "./Form.css";

const SellerDashboard = () => {
  const [formData, setFormData] = useState({
    title: "", price: "", category: "", image: null
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", "No description provided");
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("Product created successfully!");
      setFormData({ title: "", price: "", category: "", image: null });
      setPreview(null);
    } catch (error) {
      alert("Error creating product. Please try again.");
    }
  };

  return (
    <div className="container py-10 pb-20">
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Seller Dashboard</h1>
        <p className="text-slate-500 text-lg">List and manage your campus store</p>
      </motion.div>

      <motion.div className="aurora-card max-w-2xl mx-auto p-8 mb-12" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <h2 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
          <Upload size={24} className="text-purple-500" />
          List a New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex flex-col gap-2 font-medium text-slate-600 mb-1">
              <span className="flex items-center gap-2"><Package size={18} /> Product Title</span>
              <input name="title" type="text" className="aurora-input" placeholder="e.g. Graphic Tablet" value={formData.title} onChange={handleChange} required />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 font-medium text-slate-600 mb-1">
              <span className="flex items-center gap-2"><DollarSign size={18} /> Price (₹)</span>
              <input name="price" type="number" className="aurora-input" value={formData.price} onChange={handleChange} placeholder="599" required />
            </label>

            <label className="flex flex-col gap-2 font-medium text-slate-600 mb-1">
              <span className="flex items-center gap-2"><Layers size={18} /> Category</span>
              <select name="category" className="aurora-select" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Lab Gear">Lab Gear</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div>
            <label className="flex flex-col gap-2 font-medium text-slate-600 mb-1">
              <span className="flex items-center gap-2"><ImageIcon size={18} /> Image</span>
              <div className="file-drop-area">
                <input type="file" onChange={handleFileChange} accept="image/*" className="hidden-upload" />
                {preview ? (
                  <div className="preview-wrap">
                    <img src={preview} alt="Preview" className="preview-img" />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Upload size={32} className="mx-auto mb-3 text-purple-400" />
                    <p className="text-slate-600 font-medium">Click to upload photo</p>
                    <p className="text-slate-400 text-sm">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          <button type="submit" className="btn-aurora w-full py-4 text-lg mt-4">
            Post Advertisement
          </button>
        </form>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-slate-800 mb-8 border-b border-slate-200 pb-4">Your Active Listings</h3>
        <MyProducts />
      </div>
    </div>
  );
};

export default SellerDashboard;