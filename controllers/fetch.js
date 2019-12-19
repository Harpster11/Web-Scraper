// Controller for our scraper
// ============================
var db = require("../models");
var getNews = require("../scripts/scrape");

module.exports = {
  getNews: function(req, res) {
      console.log(req.params.query);
      // var query = req.body.toLowerCase();
      var newsSearch = req.params.query
      return getNews(newsSearch)
      .then(function(articles) {
        // then insert articles into the db
        console.log("Articles Scraped",articles)
        // return db.Headline.create(articles);
      })
      .catch(function(err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        res.json({
          message: "Scrape error!!",
          error: err
        });
      });
  }
};
