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

router.route("/category/:id").get(ticketsController.findByCategory);
router
  .route("/category/:id/subcategory/:sub")
  .get(ticketsController.findByCategorySub);

router.route("/status/:id").get(ticketsController.findByStatus);
module.exports = router;
