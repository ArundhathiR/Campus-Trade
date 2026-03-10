const express = require("express");
const router = express.Router();
const { createProduct, 
    getProducts, 
    getProductById, 
    deleteProduct } = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;