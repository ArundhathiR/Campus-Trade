import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Tag, ArrowLeft, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container pd-loading">
        <div className="skeleton pd-skeleton-img"></div>
        <div className="pd-skeleton-info">
          <div className="skeleton h-10 w-3/4 rounded-xl mb-4"></div>
          <div className="skeleton h-6 w-1/4 rounded-lg mb-8"></div>
          <div className="skeleton h-24 w-full rounded-xl mb-6"></div>
          <div className="skeleton h-12 w-1/3 rounded-xl mb-8"></div>
          <div className="skeleton h-14 w-1/2 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state container" style={{ marginTop: '100px' }}>
        <PackageCheck size={64} className="mx-auto mb-4 text-slate-300" />
        <p className="text-slate-500 text-lg font-medium">This item is no longer available.</p>
        <button className="btn-soft mt-6" onClick={() => navigate("/")}>Go back home</button>
      </div>
    );
  }

  const imageUrl = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `http://localhost:5000/${product.image.replace(/^\//, '')}`
    : "https://images.unsplash.com/photo-1510255269784-06d274dc5942?q=80&w=2070&auto=format&fit=crop";

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container pd-wrapper">
      <motion.button
        className="pd-back"
        onClick={() => navigate(-1)}
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={18} />
        <span>Back to items</span>
      </motion.button>

      <div className="pd-grid">
        <motion.div
          className="pd-img-card aurora-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={imageUrl} alt={product.title} className="pd-img" />
        </motion.div>

        <motion.div
          className="pd-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="pd-category">
            <Tag size={16} />
            <span>{product.category}</span>
          </div>

          <h1 className="pd-title">{product.title}</h1>
          <p className="pd-desc">{product.description || "No detailed description provided by the seller."}</p>

          <div className="pd-price-wrap">
            <span className="pd-price">₹{product.price}</span>
          </div>

          <button className="btn-aurora pd-add-btn" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;