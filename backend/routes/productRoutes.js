const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  getMyProducts
} = require("../controllers/productController");

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/my-products", getMyProducts); // must come before /:id
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;