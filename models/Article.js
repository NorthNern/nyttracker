var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String
  },
  url: {
  	type: String
  },
  date: {
    type: Date
  },
  createdAt: {
  	type: Date,
  	default: Date.now
  }
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
