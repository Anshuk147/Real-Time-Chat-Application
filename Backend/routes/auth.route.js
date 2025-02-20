const express = require("express");
const { body } = require("express-validator");
const { signup, login, logout ,updateProfilepic, checkAuth2} = require("../controllers/auth.controller");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

// Signup route with improved validation messages
router.post(
  "/signup",
  [
    body("fullName")
    .notEmpty()
    .withMessage("Full name is required and cannot be empty")
    .isString()
    .withMessage("Full name must be a valid string")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long")
    .matches(/[A-Za-z]/)
    .withMessage("Full name must contain  alphabetic character"),
  

    body("email")
      .notEmpty()
      .withMessage("Email is required and cannot be empty")
      .isString()
      .withMessage("Email must be a valid string")
      .isEmail()
      .withMessage(
        "Invalid email format. Please provide a valid email address"
      ),

    body("password")
      .notEmpty()
      .withMessage("Password is required and cannot be empty")
      .isString()
      .withMessage("Password must be a valid string")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  signup
);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required and cannot be empty")
      .isString()
      .withMessage("Email must be a valid string")
      .isEmail()
      .withMessage(
        "Invalid email format. Please provide a valid email address"
      ),

    body("password")
      .notEmpty()
      .withMessage("Password is required and cannot be empty")
      .isString()
      .withMessage("Password must be a valid string")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  login
);
router.get("/logout", checkAuth, logout);
router.put("/update-profilePic",checkAuth,updateProfilepic)
router.get("/check",checkAuth,checkAuth2);
module.exports = router;
