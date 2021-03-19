const router = require("express").Router();
const ticketsController = require("../controllers/ticketsController");

// Matches with "/tickets"
router.route("/").get(ticketsController.findAll).post(ticketsController.create);

// Matches with "/tickets/:id"
router
  .route("/:id")
  .get(ticketsController.findById)
  .put(ticketsController.update)
  .delete(ticketsController.remove);

module.exports = router;
