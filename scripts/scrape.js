// require axios and cheerio, enabling scrapes
var axios = require("axios");
var cheerio = require("cheerio");
// set base URL for links
var baseURL = "https://www.jpost.com/breaking-news/";

var scrape = function() {

    // making an axios 'get' to the Breaking-News section of jpost.com website
    return axios.get(baseURL).then(function(response) {
    
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
            
            var newData = {
                headline: headline,
                link: link,
                reporterDate: reporter + " - " + date
            };
            // push article data into the articles array
            articles.push(newData);
        }
    });
    
    // console.log(articles);

    return articles;

    });
}

module.exports = scrape;
