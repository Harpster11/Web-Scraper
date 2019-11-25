$(document).ready(function() {
    // event listeners
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // initPage function
    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
          .then(function(data) {
            // if headlines, then render
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    }

    // handles appending HTML with article data to the page
    function renderArticles(articles) {
        var articlePanels = [];
        // pass each article JSON object to the createPanel function that
        // returns a bootstrap panel with the article data inside
        for (var i=0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        // when all the HTML is stored in our articlePanels array,
        // append them to the articlePanels container
        articleContainer.append(articlePanels);
    }

    // takes a single article and builds a jquery element with html
    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));
        // attach the article id to the jquery element
        panel.data("_id", article._id);
        // return the constructed panel
        return panel;
    }

    // renders HTML to the page explaining we don't have any articles
    function renderEmpty() {
        var emptyAlert = 
        $(["<div class='alert alert-warning text-center'>",
            "<h4>Sorry. There are no new articles to view.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class-'panel-heading text-center'>",
            "<h3>What do you want to do?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Go to Saved Articles<a/></h4>",
            "</div>",
            "</div>"
        ].join(""));
        // append to the page
        articleContainer.append(emptyAlert);
    }

    // function is used when a user wants to save an article
    function handleArticleSave() {
        // retrieving the headline id using the data method
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
        // using a patch method as an update to an existing record in the db
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
        .then(function(data) {
            // if ok, mongoose will send back an object with a key of "ok=1"
            if (data.ok) {
                // run the initPage function again to reload the list of articles
                initPage();
            }
        });
    }

    function handleArticleScrape() {
        // handles scraping new article buttons
        $.get("/api/fetch")
            .then(function(data) {
            // if successful scraping articles and comparing to saved articles
            // re-render the articles to the page and alert the user how many
            initPage();
            bootbox.alert("<h3 class='text-center m-top-uo'>" + data.message + "<h3>");
        });
    }
});