require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();
const cartRoutes = require("./routes/cartRoutes");

app.use("/api/cart", cartRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusTrade API Running");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch(err => console.log(err));