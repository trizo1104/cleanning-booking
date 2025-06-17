const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ mess: "Unauthorized - No token provided" });

    let decode;
    try {
      decode = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid or expired token" });
    }

    if (!decode)
      return res.status(401).json({ mess: "Unauthorized - Invalid token" });

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ mess: "Internal server error", error: error.message });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

const employeeOnly = (req, res, next) => {
  if (req.user && req.user.role === "employee") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Employees only" });
  }
};

module.exports = { protectRoute, adminOnly, employeeOnly };
