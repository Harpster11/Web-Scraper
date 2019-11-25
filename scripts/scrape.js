// require axios and cheerio, enabling scrapes
var axios = require("axios");
var cheerio = require("cheerio");
// set base URL for links
var baseURL = "https://www.cnn.com";

var scrape = function(cb) {

    // making an axios 'get' to the World section of CNN.com
    axios.get("https://www.cnn.com/world/").then(function(response) {
    
    console.log("SCRAPE : AXIOS RESPONSE ====>");
    // console.log(response.data);

    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var articles = [];

    $("h3").each(function(i, element) {

        // Save the title, section, and link data
        var title = $(this).find("span.cd__headline-text").text();
        var section = $(this).parent().parent().parent().attr("data-section-name");
        var link = $(this).find("a").attr("href");

        console.log(title);
        
        // Save these results in an object that we'll push into the articles array
        if (title && link) {

            // only include items where the href starts with "/"
            // (avoids including ads)

            if(link[0] === "/") {
                articles.push({
                title: title,
                section: section,
                link: baseURL + link
                });
            }
        }
    });

    console.log("SCRAPE.JS ARTICLES ========> ");
    console.log(articles);

    // callback
    cb(articles);

    });
}

module.exports = scrape;
