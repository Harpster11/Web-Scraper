// require axios and cheerio, enabling scrapes
var axios = require("axios");
var cheerio = require("cheerio");
// set base URL for links
var baseURL = "https://www.jpost.com/breaking-news/";

var scrape = function(cb) {

    // making an axios 'get' to the World section of CNN.com
    axios.get("https://www.cnn.com/world/").then(function(response) {
    
    console.log("SCRAPE : AXIOS RESPONSE ====>");
    // console.log(response.data);

    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var articles = [];

    $("div.breaking-news-link-container").each(function(i, element) {

        // Save the headline, section, and link data
        var headline = $(this).find("a").attr("title");
        var link = $(this).find("a").attr("href");
        var reporter = $(this).find("ul").children().text("il[0]");
        var date = $(this).find("ul").children().text("il[1]");
        var reporterDate = reporter + ", " + date;

        console.log(headline);
        console.log(link);
        console.log(reporterDate);
        console.log("========");
        
        // Save these results in an object that we'll push into the articles array
        if (headline && link) {

            articles.push({
            headline: headline,
            link: link,
            reporterDate: reporterDate
            });
        }
    });

    console.log("SCRAPE.JS ARTICLES ========> ");
    console.log(articles);

    // callback
    cb(articles);

    });
}

module.exports = scrape;
