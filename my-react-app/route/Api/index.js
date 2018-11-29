const router = require("express").Router();
const bookRoutes = require("./books");
const noteRoutes = require("./notes");

router.use("/books", bookRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
