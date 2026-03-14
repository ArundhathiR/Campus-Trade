import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "./Home.css";

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/products?t=${Date.now()}`,
          {
            headers: {
              "Cache-Control": "no-cache"
            }
          }
        );

        console.log("All products:", res.data);

        setProducts(res.data);

      } catch (error) {
        console.log(error);
      }

    };

    fetchProducts();

  }, []);

  return (
    <div className="container">

      <h1 className="text-center mt-20">Campus Trade Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          margin: "20px auto",
          display: "block"
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginLeft: "20px", padding: "10px" }}
      >
        <option value="">All Categories</option>
        <option value="Books">Books</option>
        <option value="Electronics">Electronics</option>
        <option value="Lab Gear">Lab Gear</option>
      </select>

      <div className="product-grid">

        {products
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((product) =>
            category ? product.category === category : true
          )
          .map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}

      </div>

    </div>
  );
}

export default Home;