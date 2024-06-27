const express = require("express");
const router = express.Router();

// Import the destructured User controls
const { register, login } = require("../controller/userController.js");

// register the user
router.post("/register", register);

router.post("/login", login);
 

module.exports = router;