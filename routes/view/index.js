var router = require("express").Router();
var db = require("../../models");

// This route renders the homepage
router.get("/", function(req, res) {
  db.Headline.find({ saved: false })
    .sort({ score: 1 })
    .then(function(dbArticles) {
      res.render("home", { articles: dbArticles });
    });
});

// This route renders the saved handlebars page
router.get("/presentation", function(req, res) {
    res.render("presentation");
});

module.exports = router;
