// Controller for our scraper
// ============================
var db = require("../models");
var getNews = require("../scripts/scrape");

module.exports = {
  getNews: function(req, res) {
      console.log(req.params.query);
      // var query = req.body.toLowerCase();
      var newsSearch = req.params.query
      console.log("NEWSEARCH = " + newsSearch);
      return getNews(newsSearch).then(function(res) {
        console.log("Articles Scraped",res);
        // then insert articles into the db
        return db.Headline.create(res);
      })
      .catch(function(err) {
        // This query won't insert articles with duplicate titles, but it will error after inserting the others
        res.json({
          message: "Scrape error!!",
          error: err
        });
      });
  }
};

