const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const Role = require("../models/roles.model");


// Authentication Middleware (returns a user request)
const protect = async (req, res, next) => {
  try {
    const token = req.header("Authentication");
    if (!token) {
      res.status(404);
      throw new Error("Unauthenticate: Missing token");
    }
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded._id)
      .select("-password")
      .populate("roleId");
    if (!user) {
      res.status(400);
      throw new Error("Unauthenticate : Invalid token");
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Authorization Middleware (get and return a user request) 
const authorization = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.roleId.name !== "Admin") {
      res.status(400)
      throw new Error("Forbidden, You are not authorize");
    }else
    req.user = user;

    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { protect, authorization };
