const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

exports.getCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart || { items: [] });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    // Validate productId
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Convert productId to ObjectId
    let productObjectId;
    try {
      productObjectId = new mongoose.Types.ObjectId(productId);
    } catch (e) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const existing = cart.items.find(
      (item) => item.productId.toString() === productObjectId.toString(),
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ productId: productObjectId });
    }

    await cart.save();

    // Populate product details before returning
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let productObjectId;
    try {
      productObjectId = new mongoose.Types.ObjectId(productId);
    } catch (e) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productObjectId.toString(),
    );

    await cart.save();

    // Populate product details before returning
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    let productObjectId;
    try {
      productObjectId = new mongoose.Types.ObjectId(productId);
    } catch (e) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productObjectId.toString(),
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productObjectId.toString(),
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    // Populate product details before returning
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];

    await cart.save();

    // Populate product details before returning (will be empty but for consistency)
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ message: err.message });
  }
};
