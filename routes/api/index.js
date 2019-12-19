var router = require("express").Router();
var fetchRoutes = require("./fetch");
var noteRoutes = require("./notes");
var headlineRoutes = require("./headlines");
var clearRoutes = require("./clear");
var fetchController = require("../../controllers/fetch");

router.use("/fetch/:query", fetchController.getNews);
router.use("/notes", noteRoutes);
router.use("/headlines", headlineRoutes);
router.use("/clear", clearRoutes);

module.exports = router;
