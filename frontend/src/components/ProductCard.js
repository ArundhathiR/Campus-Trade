import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const imageUrl = product.image
    ? `http://localhost:5000/${product.image}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="product-card">

      <Link to={`/product/${product._id}`} className="product-link">

        <div className="card-image-container">
          <img
            src={imageUrl}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="card-content">
          <h3 className="product-title">{product.title}</h3>

          <p className="product-price">
            ₹{product.price}
          </p>

          <span className="product-category">
            {product.category}
          </span>
        </div>

      </Link>

    </div>
  );
};

export default ProductCard;