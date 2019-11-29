# Web-Scraper

A node app that scrapes a news website for breaking news headlines.

![Web-Scraper](https://github.com/AlanLeverenz/Web-Scraper/blob/master/public/assets/images/jumbotron.png)

## What the app does

This app displays a menu of burgers, a list of burgers to be devoured, and customers to eat them. The user has the option to:

1. Add customers to the customer list
2. Add new burgers to the menu, with toppings
3. Select a customer and devour a burger on the menu



### Technology

The __dependencies__ for this nodejs app are:

* body-parser
* dotenv
* express
* express-handlebars
* fs
* method-override
* mysql2
* path
* sequelize

The __database__ is MySQL, which stores two tables, Burgers and Customers, which are defined in two Model files. Burgers has a *belongsTo* association with the Customers table with a CustomerId foreign key.

A __Handlebars Helper__ called *equal* was created in order to list burgers devoured by each customer when *index.Handlebars* is rendered. Here is the helper code added to the *server.js* file.

````
var hbs = exphbs.create({
  helpers: {
    equal : function(a, b, opts) {
      if (a == b) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
    }
  },
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
});

````
Here is how the {{#equal}} object is used to properly render the devoured burgers in the customer list column:

````
<div class="col-3 text-center" id="customer-list">
    {{#each customer_data}}
        <div class="text-center customer">
            {{this.name}}
        </div>

        {{!-- devoured burger list --}}
        <div class="eaten">
            {{#each ../burger_data}}
                {{#equal ../this.id this.CustomerId}}
                    <input class="form-control" type="text" placeholder="{{this.id}}. {{this.name}}" readonly>
                {{/equal}}
            {{/each}}
        </div>
    {{/each}}
</div> 
````

### Author

Alan Leverenz (awleverenz@gmail.com)