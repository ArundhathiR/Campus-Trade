import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
 // Ensure this is imported to see the background and fonts!

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
    /* Use the 'container' class to center the page and add padding */
    <div className="container">
      <h1 className="text-center mt-20">Campus Trade Products</h1>

      {/* Replace the inline style with 'product-grid'. 
         This allows our CSS file to handle the layout.
      */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))
        ) : (
          <p className="text-center">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Home;