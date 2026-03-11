const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  getMyProducts
} = require("../controllers/productController");

router.post("/", authMiddleware, upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/my-products", authMiddleware, getMyProducts);

router.get("/:id", getProductById);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
