import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div className="home-container">

      <h2 className="home-title">Latest Products</h2>

      <div className="product-grid">

        {products.map(product => (
          <ProductCard key={product._id} product={product}/>
        ))}

      </div>

    </div>
  );
}

export default Home;