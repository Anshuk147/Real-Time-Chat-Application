const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const {
  getUserforsidebar,
  getMessages,
  sendMessage,
} = require("../controllers/message.controller");

router.get("/user", checkAuth, getUserforsidebar);
router.get("/:id", checkAuth, getMessages);
router.post("/send/:id", checkAuth, sendMessage);

module.exports = router;
