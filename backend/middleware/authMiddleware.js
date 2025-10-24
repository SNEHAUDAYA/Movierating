const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    // Get token from Authorization header or custom header
    let token =
      req.headers.authorization?.split(" ")[1] || req.headers["x-access-token"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Token is invalid or expired" });
  }
};

// New middleware for optional authentication
exports.optionalAuth = async (req, res, next) => {
  try {
    let token =
      req.headers.authorization?.split(" ")[1] || req.headers["x-access-token"];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};
