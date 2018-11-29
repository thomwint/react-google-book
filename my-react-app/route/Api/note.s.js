const router = require("express").Router();
const notesController = require("../../controllers/notesController");

router
  .route("/:id")
  .delete(notesController.remove);

module.exports = router;
