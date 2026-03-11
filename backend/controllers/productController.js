const Product = require("../models/productModel");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {

    const { title, price, description, category } = req.body;

    const product = new Product({
      title,
      price,
      description,
      category,
      image: req.file ? `uploads/${req.file.filename}` : "",
      sellerId: req.user ? req.user.id : null
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCTS OF LOGGED-IN SELLER
exports.getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({ sellerId: req.user.id });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};