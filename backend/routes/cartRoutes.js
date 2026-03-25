const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/update-quantity", authMiddleware, updateQuantity);
router.post("/clear", authMiddleware, clearCart);

module.exports = router;
