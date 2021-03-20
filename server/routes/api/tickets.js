const router = require("express").Router();
const ticketsController = require("../../controllers/ticketsController");

router.route("/").get(ticketsController.findAll);
router.route("/").post(ticketsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(ticketsController.findById)
  .put(ticketsController.update)
  .delete(ticketsController.remove);

module.exports = router;
