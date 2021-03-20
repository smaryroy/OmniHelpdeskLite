const router = require("express").Router();
const ticketRoutes = require("./tickets");

// Ticket routes
router.use("/tickets", ticketRoutes);

module.exports = router;
