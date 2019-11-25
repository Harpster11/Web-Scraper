// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");
// base URL of the website
var baseURL = "https://www.cnn.com";

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every headline, section, and link\n" +
            "from cnn's world news website:" +
            "\n***********************************\n");

// Making a request via axios to get a promise response
axios.get("https://www.cnn.com/world/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each li.children(article) tag with the "title" class
  // (i: iterator. element: the current element)
  $("h3").each(function(i, element) {

    // Save the title, section, and link data
    var title = $(this).find("span.cd__headline-text").text();
    var section = $(this).parent().parent().parent().attr("data-section-name");
    var link = $(this).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    
    if(link[0] === "/") {
        results.push({
        title: title,
        section: section,
        link: baseURL + link
        });
    }
  });

  // Log the results
  console.log(results);
});
