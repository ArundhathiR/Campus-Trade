const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Get the raw header (e.g., "Bearer eyJhbG...")
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2. Split the string by the space and take the second part (the actual token)
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token format is invalid (Use Bearer)" });
  }

  try {
    // 3. Now verify ONLY the token part
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;