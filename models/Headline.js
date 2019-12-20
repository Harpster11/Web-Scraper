// Headline model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the headlineSchema with our schema class
var headlineSchema = new Schema({
  // source with id and name 
  // source: {
  //   id: String,
  //   name: String
  // },
  // author
  author: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  // title, a string, must be entered
  title: {
    type: String,
    required: false
  },
  // url to article, a string, must be entered
  url: {
    type: String,
    required: true
  },
  // image url
  urlToImage: {
    type: String,
    required: false
  },
  // published date
  publishedAt: {
    type: Date,
    required: false
  },
  // description
  description: {
    type: String,
    required: false
  },
  // content
  content: {
    type: String,
    required: false
  },
  // type
  type: {
    type: String,
    required: false
  },
    // score
score: {
  type: String,
  required: false
},
  // ratio
  ratio: {
    type: String,
    required: false
  },
  // date is just a string
  date: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// Create the Headline model using the headlineSchema
var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;
