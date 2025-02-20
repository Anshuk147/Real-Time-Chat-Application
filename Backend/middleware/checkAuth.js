const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");

dotenv.config();

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded",decoded);
    const userId = decoded.userid;
    // console.log("userid",userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Unauthorized, token is invalid or expired" });
  }
};

module.exports = checkAuth;
