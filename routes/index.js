const router = require("express").Router();

// Ticket routes
const ticketRoutes = require("./tickets");
router.use("/tickets", ticketRoutes);

// User routes
const userRoutes = require("./users");
router.use("/users", userRoutes);

// Auth  routes
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

module.exports = router;
