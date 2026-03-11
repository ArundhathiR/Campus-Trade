const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
try {
const { title, price, description, category } = req.body;

const product = new Product({
 title,
 price,
 description,
 category,
 image: req.file ? req.file.path : ""
});
const savedProduct = await product.save();

res.status(201).json(savedProduct);

} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.getProducts = async (req, res) => {

try {

const products = await Product.find();

res.json(products);

} catch (error) {
res.status(500).json({ message: error.message });
}

};

exports.getProductById = async (req, res) => {

try {

const product = await Product.findById(req.params.id);

res.json(product);

} catch (error) {
res.status(500).json({ message: error.message });
}

};

exports.deleteProduct = async (req, res) => {

try {

await Product.findByIdAndDelete(req.params.id);

res.json({ message: "Product deleted" });

} catch (error) {
res.status(500).json({ message: error.message });
}

};