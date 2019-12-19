var router = require("express").Router();
var fetchController = require("../../controllers/fetch");

router.use(fetchController.getNews);

module.exports = router;
