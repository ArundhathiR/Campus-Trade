import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Campus Trade Products</h1>

      <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>

    </div>
  );
};

export default Home;