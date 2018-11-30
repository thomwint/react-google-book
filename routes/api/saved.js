const router = require("express").Router();
const savedController = require("../../controllers/savedController");

router
  .route("/:id")
  .delete(savedController.remove);

module.exports = router;
