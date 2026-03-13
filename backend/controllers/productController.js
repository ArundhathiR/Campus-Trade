const Product = require("../models/productModel");


// CREATE PRODUCT
exports.createProduct = async (req, res) => {

  try {

    const { title, description, price, category } = req.body;

    const product = new Product({

      title,
      description,
      price,
      category,

      image: req.file
        ? `uploads/${req.file.filename}`
        : "",

      sellerId: req.user.id

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

    res.json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// GET MY PRODUCTS
exports.getMyProducts = async (req, res) => {

  try {

    const products = await Product.find({
      sellerId: req.user.id
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};