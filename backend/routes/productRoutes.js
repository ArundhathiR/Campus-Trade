const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");


// Multer storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }

});

const upload = multer({ storage });



// ROUTES

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createProduct
);

router.get(
  "/my-products",
  authMiddleware,
  getMyProducts
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);


module.exports = router;