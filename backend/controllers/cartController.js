const Cart = require("../models/cartModel");

exports.getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    res.json(cart || { items: [] });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {

  const { productId } = req.body;

  try {

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: []
      });
    }

    const existing = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ productId });
    }

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};