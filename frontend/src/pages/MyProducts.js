import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProducts() {

  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const deleteProduct = async (id) => {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchMyProducts();
  };

  return (

    <div>

      <h2>My Products</h2>

      {products.map(product => (

        <div key={product._id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>

          <img
            src={`http://localhost:5000/${product.image}`}
            width="120"
            alt={product.title}
          />

          <h3>{product.title}</h3>
          <p>₹{product.price}</p>

          <button onClick={() => deleteProduct(product._id)}>
            Delete
          </button>

        </div>

      ))}

    </div>

  );
}

export default MyProducts;