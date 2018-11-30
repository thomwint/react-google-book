const router = require("express").Router();
const bookRoutes = require("./books");
const savedRoutes = require("./saved");

router.use("/books", bookRoutes);
router.use("/saved", savedRoutes);

module.exports = router;
