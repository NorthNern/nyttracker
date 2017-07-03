// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article schema
var Article = require("./models/Article.js");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080;

//var PORT = 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
//ROUTES

// * `/api/saved` (get) - your components will use this to query MongoDB for all saved articles
 app.get("/api/saved", function(req, res) {
     Article.find({}).sort([
      ["date", "descending"]
      ]).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
     });
 });

// * `/api/saved` (post) - your components will use this to save an article to the database
  app.post("/api/saved", function(req, res) {
    // Save the result object
    Article.create({
      headline: req.body.headline,
      date: req.body.date,
      url: req.body.url
    }), function (err) {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Saved Article");
      }
    }
  });

// * `/api/saved` (delete) - your components will use this to delete a saved article in the database
 app.delete("/api/saved/:id", function(req, res) {
    Article.findOneAndRemove({"_id": req.params.id})
    .exec(function(err, data) {
        console.log("Article Deleted")
        if (err) {
          console.log(err);
        } else {
            res.send(data);
        }
    })

 });

// * `*` (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes

// Main "/" Route. This will redirect the user to our rendered React application
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});