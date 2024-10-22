const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers);

// Create a new user
router.post("/add-user", userController.createUser);

// Update an existing user
router.post("/update-user", userController.updateUser);

// Delete a user
router.post("/delete-user", userController.deleteUser);

module.exports = router;
