// server routes

// require the scrape function from the scripts directory
var scrape = require("../scripts/scrape");

// require the headlines and notes from the controller
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    // renders the homepage
    router.get("/", function(req, res) {
        // var query = {};
        // headlinesController.get(query, function(data) {
        // res.render("home", {data});
        // });

        res.render("home");
    });

    // renders the saved handlebars page
    router.get("/saved", function(req, res) {

        // query all saved articles 
        // var query = {};
        // query.saved = "true";
        // headlinesController.get(query, function(err, saved_data) {
        // res.render("saved", {saved_data});
        // });
        res.render("saved");
    });

    // fetch headlines via the api
    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                // console.log("ROUTES : NO ARTICLES =====>");
                res.json({
                    message: "Sorry. No new articles."
                });
            }
            else {
                // console.log("ROUTES : ADDED ARTICLES =====>");
                res.json({
                    message: "Added " + docs.insertedCount + " new articles."
                });
            }
        });
    });

    // get headlines from the db
    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        // if no query, get everything
        headlinesController.get(query, function(data) {
            res.json(data);
        });
    });

    // delete a specific headline
    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    // update a specific headline as saved
    router.put("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    // route to update the headlines
    router.patch("/api/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    // getting all notes associated with a headline
    router.get("/api/notes/:headline_id?", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

    // route to delete a note
    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    // route to post new notes to articles
    router.post("/api/notes", function(req, res) {
        // console.log("SAVE NOTE => REQ BODY");
        console.log(req.body);
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });
}