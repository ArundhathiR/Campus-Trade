import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>

      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.title}
        width="100"
      />

      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
      <p>Category: {product.category}</p>

    </div>
  );
}

export default ProductDetails;