# Web-Scraper

![Web-Scraper](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/jumbotron.png)

## What the app does

This app scrapes the Jerusalem Post website (www.jpost.com/breaking-news) for breaking news headlines.

![JPOST Breaking News Header](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/jpost-breaking-news-head.png)

![JPOST Breaking News List](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/jpost-breaking-news-list.png)

The *headline*, *link*, *reporter*, and *date* of the report are captured, stored, and rendered to the app's home page. Here is how a headline is displayed in the Web-Scraper app.

![Unsaved Article](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/my_unsaved_article.png)

Articles can be marked as 'saved' by clicking on the *SAVE ARTICLE* button.

Clicking on the headline itself will load the linked article in another web tab, as displayed below.

![Linked Article](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/linked_article.png)

The Home page navbar has links to the *Home* page and *Saved* articles.

![Unsaved Article Navbar](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/unsaved_article_navbar.png)

Click on the *Saved Articles* link to view the list of saved articles. Saved articles have two buttons for either removing it (*DELETE FROM SAVED*), or adding notes to it (*ARTICLE NOTES*).

![Saved Article](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/saved_article.png)

Here is the Notes (modal) bootbox. Notes can be saved or removed from the list.

![Note](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/note.png)

The Saved Articles navbar has a link to return to the Home Page, as well as a *CLEAR ARTICLES* button. In this version of the app, this button removes the list of headlines from page without deleting them from the database.

### Technology

The **dependencies** for this nodejs app are:

* axios
* bootbox
* cheerio
* express
* express-handlebars
* mongoose
* morgan
* request

The **database** used by the app is MongoDB. The database name is *mongoHeadLines*. It stores two collections, *Headlines* and *Notes*, which are defined in two Model files. To relate notes that may be entered for a particular headline, the Notes model includes a reference id to Headline model using the _headlineId data record.

Web data is requested and returned using the Axios fetch method. Specific data elements are accessed using Cheerio and stored in a MongoDB database. 

The Headline collection in three records:
 
 1. headline
 2. link
 3. reporterDate

The reporterDate field is created by slicing the <li> text returned after finding its parent <ul> tag.

````
var headline = $(this).find("a").attr("title");
var link = $(this).find("a").attr("href");
var rd = $(this).find('ul').children('li').text();
var len = rd.length;
var date = rd.slice(-19);
var reporter = rd.slice(0, (len - 19));
````

The date and reporter slices are concatenated into the reportDate data record:

````
if (headline && link) {
    articles.push({
    headline: headline,
    link: link,
    reporterDate: reporter + " " + date
    });
}
````

The **page rendering** engine is Express Handelbars.

### Author

Alan Leverenz (awleverenz@gmail.com)