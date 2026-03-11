const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  getMyProducts
} = require("../controllers/productController");

// CREATE PRODUCT
router.post("/", upload.single("image"), createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SELLER PRODUCTS
router.get("/my-products",auth, getMyProducts);

// GET PRODUCT BY ID
router.get("/:id", getProductById);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;