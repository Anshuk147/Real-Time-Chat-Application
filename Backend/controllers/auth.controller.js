const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwttokenGenerator = require("../utils/jwtgenerator");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwttokenGenerator(newUser);

    res.cookie("token", token, {
      httpOnly: true, // Prevents access to the cookie from JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 3600000, // Cookie expires in 1 hour
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Failed", error: error.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "This Email does not exist" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwttokenGenerator(user);
    res.cookie("token", token, {
      httpOnly: true, // Prevents access to the cookie from JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 3600000, // Cookie expires in 1 hour
    });

    // Login successful
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const updateProfilepic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pictures", // Optional: Store in a specific folder
    });

    // Update user profile with Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth2 = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { signup, login, logout, updateProfilepic, checkAuth2 };
