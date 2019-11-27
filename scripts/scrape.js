// require axios and cheerio, enabling scrapes
var axios = require("axios");
var cheerio = require("cheerio");
// set base URL for links
var baseURL = "https://www.jpost.com/breaking-news/";

var scrape = function(cb) {

    // making an axios 'get' to the World section of CNN.com
    axios.get(baseURL).then(function(response) {
    
    console.log("SCRAPE : AXIOS RESPONSE ====>");
    // console.log(response.data);

    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var articles = [];

    $("div.breaking-news-link-container").each(function(i, element) {

        // Save the headline, link, reporter and date
        var headline = $(this).find("a").attr("title");
        var link = $(this).find("a").attr("href");
        var rd = $(this).find('ul').children('li').text();
        var len = rd.length;
        var date = rd.slice(-19);
        var reporter = rd.slice(0, (len - 19));
        
        // Save results in an object and push into the articles array
        if (headline && link) {

            articles.push({
            headline: headline,
            link: link,
            reporterDate: reporter + " " + date
            });
        }
    });

    // console.log("SCRAPE.JS ARTICLES ========> ");
    console.log(articles);

    // callback
    cb(articles);

    });
}

module.exports = scrape;
