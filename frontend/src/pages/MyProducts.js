import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MyProducts({ refreshTrigger }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:5000/api/products/my-products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto mb-4 text-slate-300" />
        <p className="text-slate-500 font-medium">No products listed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="aurora-card p-4 flex items-center gap-6"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
              <img
                src={product.image
                  ? product.image.startsWith('http')
                    ? product.image
                    : `http://localhost:5000/${product.image.replace(/^\//, '')}`
                  : "https://images.unsplash.com/photo-1510255269784-06d274dc5942?q=80&w=2070&auto=format&fit=crop"
                }
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-slate-800 truncate mb-1">{product.title}</h4>
              <p className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                ₹{product.price}
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
                {product.category}
              </span>
            </div>

            <button
              onClick={() => handleDelete(product._id)}
              className="btn-danger flex items-center gap-2 px-5"
            >
              <Trash2 size={18} />
              <span>Remove</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default MyProducts;