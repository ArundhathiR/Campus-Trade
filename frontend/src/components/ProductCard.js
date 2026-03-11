import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={{
      border:"1px solid #ddd",
      padding:"10px",
      width:"200px"
    }}>

    <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.title}
        style={{ width: "100px" }}
    />

      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>

    </div>
  );
};

export default ProductCard;