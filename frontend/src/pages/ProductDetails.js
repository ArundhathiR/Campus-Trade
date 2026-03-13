import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="loading">Loading product...</p>;

  if (!product) return <p className="error">Product not found</p>;

  const imageUrl = product.image
    ? `http://localhost:5000/${product.image}`
    : "https://via.placeholder.com/400";

  return (
    <div className="product-details-container">

      <div className="product-image-section">
        <img
          src={imageUrl}
          alt={product.title}
          className="product-details-image"
        />
      </div>

      <div className="product-info-section">

        <h1 className="product-details-title">{product.title}</h1>

        <p className="product-details-category">
          Category: {product.category}
        </p>

        <p className="product-details-description">
          {product.description}
        </p>

        <h2 className="product-details-price">
          ₹{product.price}
        </h2>

        <button className="add-to-cart-btn">
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;