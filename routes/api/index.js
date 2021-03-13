const router = require("express").Router();

// Ticket routes
router.use("/tickets", ticketRoutes);

module.exports = router;
