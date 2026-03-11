import React from "react";
import CreateProduct from "../components/CreateProduct";
import MyProducts from "../components/MyProducts";

function SellerDashboard() {
  return (
    <div>
      <h1>Seller Dashboard</h1>
      <CreateProduct />
      <MyProducts />
    </div>
  );
}

export default SellerDashboard;