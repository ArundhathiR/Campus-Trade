const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER: Create a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, college } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create user (Note: In a real app, you'd hash the password here)
    user = new User({ name, email, password, college });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration", error: err.message });
  }
};

// LOGIN: Verify user and return the TOKEN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate Token
   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.json({
      message: "Login successful",
      token, 
      user: { id: user._id, name: user.name }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login", error: err.message });
  }
};