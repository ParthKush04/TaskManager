const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const adminController = require("../controllers/adminController");

// All routes below require admin role
router.use(verifyToken, authorizeRoles("admin"));

router.get("/users", adminController.getAllUsers);
router.get("/tasks", adminController.getAllTasks);

module.exports = router;
