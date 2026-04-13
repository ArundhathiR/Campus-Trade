import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "./Home.css";

const categories = ["All", "Books", "Electronics", "Lab Gear", "Furniture", "Clothing", "Sports", "Other"];

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

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
        console.log("Products fetched:", res.data); // Debugging
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category ? product.category === category : true
    );

  return (
    <div className="home-aurora">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Floating background shapes */}
        <div className="floating-shape shape-circle animate-float" style={{ width: 120, height: 120, top: '20%', left: '10%' }}></div>
        <div className="floating-shape shape-square animate-float-delayed" style={{ width: 80, height: 80, top: '60%', left: '15%' }}></div>
        <div className="floating-shape shape-ring animate-float-slow" style={{ width: 150, height: 150, top: '15%', right: '12%' }}></div>
        <div className="floating-shape shape-triangle animate-float" style={{ bottom: '20%', right: '18%' }}></div>

        <div className="hero-container">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Sparkles size={16} />
            <span>The #1 Student Marketplace</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          >
            Buy & Sell Gear <br />
            <span className="text-gradient">On Campus</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Join thousands of students trading textbooks, electronics, and accessories. Experience the most vibrant marketplace.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button className="btn-aurora hero-btn-main">
              <span>Start Exploring</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-soft hero-btn-sec">
              <span>How it works</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="discovery-section">
        <div className="container">
          <motion.div
            className="search-container aurora-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="search-input-wrapper">
              <Search className="search-icon" size={24} />
              <input
                type="text"
                className="search-input"
                placeholder="Search for textbooks, electronics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn-aurora search-submit">
              Search
            </button>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="categories-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                className={`category-chip ${(cat === "All" && !category) || cat === category
                  ? "active"
                  : ""
                  }`}
                onClick={() => setCategory(cat === "All" ? "" : cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="product-showcase">
            <div className="showcase-header">
              <h2 className="section-title">
                {search ? "Search Results" : category ? `${category} Gear` : "Trending Now"}
              </h2>
            </div>

            {loading ? (
              <div className="grid-layout">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="skeleton-card aurora-card">
                    <div className="skeleton" style={{ height: 200, borderRadius: '18px 18px 0 0' }}></div>
                    <div className="p-4 flex flex-col gap-3">
                      <div className="skeleton" style={{ height: 20, width: '40%', borderRadius: 10 }}></div>
                      <div className="skeleton" style={{ height: 24, width: '80%', borderRadius: 10 }}></div>
                      <div className="skeleton" style={{ height: 32, width: '30%', borderRadius: 10 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                className="empty-results aurora-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="empty-icon-circular">
                  <Search size={32} />
                </div>
                <h3>No magic found here</h3>
                <p>Try searching with different keywords or categories.</p>
              </motion.div>
            ) : (
              <div className="grid-layout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;