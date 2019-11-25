$(document).ready(function() {
    // event listeners
    var articleContainer = $(".article-container");
    // event listeners for deleting articles, pulling up article notes
    // saving article notes, and deleting article notes
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    // initPage function when page is loaded
    initPage();

    // looking for 'saved' headlines
    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true")
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
                "<a class='btn btn-danger delete'>",
                "Delete From Saved",
                "</a>",
                "<a class='btn btn-info notes'>Article Notes</a>",
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
            "<h4>Sorry. There are no saved articles to view.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class-'panel-heading text-center'>",
            "<h3>Do you want to Browse Available Articles?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Browse Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        // append to the page
        articleContainer.append(emptyAlert);
    }

    // renders note list items to our notes modal
    // sets up an array of notes to render
    // sets up a currentNote variable to temporarily store each note
    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote;
        // if no notes, then display a message
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article (yet).",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        }
        // if there are notes, show each one
        else {
            for (var i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-dnager note-delete'>x</button>",
                    "</li>"
                ].join(")"));
                // store the note id on the delete button for access when deleting
                currentNote.children("button").data("_id", data.notes[i]._id);
                // add to the notesToRender array
                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }

    // handles deleting articles/headlines
    // use the id of the article to delete from the panel element using the delete button
    function handleArticleDelete() {
        var articleToDelete = $(this).parents(".panel").data();
        // using delete method to be semantic
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    // handles opening of the notes modal and displaying our notes
    // get the id of the article to get notes from the panel
    // the delete button sits inside
    function handleArticleNotes() {
        var currentArticle = $(this).parents(".panel").data();
        // get notes with the article id
        $.get("/api/notes/" + currentArticle._id).then(function(data){
            var modalText = [
                "div class='container-fluid text-center'>",
                "<h4>Notes For Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list=group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");
            // adding the formatted html to the node modal
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var noteData = {
                _id: currentArticle._id,
                notes: data || []
            };
            // adding info about the article and notes to the save button 
            // for easy access when trying to add a new note
            $(".btn.save").data("article", noteData);
            // renderNotesList will populate the actual note HTML inside the modal
            renderNotesList(noteData);
        });
    }

    // handles when a user tries to save a new note for an article
    // sets a variable to hold some formatted data about the note
    // gets the note types into the input box
    function handleNoteSave() {
        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();
        // if data was entered, format and post to the "/api/notes" route
        // send the formatted noteData also
        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData).then(function() {
                // close the model when finished
                bootbox.hideAll();
            });
        }
    }

    // this handles the deletion of notes
    // the the id of the note from the delete button
    function handleNoteDelete() {
        var noteToDelete = $(this).data("_id");
        // make a DELETE request to "/api/notes/" with the note id being deleted
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function() {
            // when finished, hide the modal
            bootbox.hideAll();
        });
    }

});
