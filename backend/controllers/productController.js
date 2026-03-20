const Product = require("../models/productModel");

const cloudinary = require("../config/cloudinary");

// 1. CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {

    const { title, description, price, category } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "products"
        }
      );

      imageUrl = result.secure_url;
    }

    const product = new Product({
      title,
      description,
      price,
      category,
      image: imageUrl,
      sellerId: req.user.id
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Database Save Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// 2. GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. GET MY PRODUCTS (For Seller Dashboard)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    // Check if the person deleting it is the owner
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};