import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import "./ProductCard.css";

const ProductCard = ({ product, index = 0 }) => {
  if (!product) return null;

  const imageUrl = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `http://localhost:5000/${product.image.replace(/^\//, '')}`
    : "https://images.unsplash.com/photo-1510255269784-06d274dc5942?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div
      className="aurora-product-card aurora-card-hover"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="card-img-wrap">
          <img src={imageUrl} alt={product.title} className="card-img" />
          <div className="card-img-overlay">
            <motion.div
              className="view-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={18} />
              <span>View</span>
            </motion.div>
          </div>
        </div>

        <div className="card-body">
          <span className="card-category">{product.category}</span>
          <h3 className="card-title">{product.title}</h3>
          <div className="card-price-row">
            <span className="card-price">₹{product.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;