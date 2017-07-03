// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NYT API
var APIKey = '19cce8fe38b445f98a3a4b0d9027498c';

// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  // runQuery: function(searchObject) {
    // var searchTerm = searchObject.searchTerm;
    // var searchStartYear = searchObject.searchStartYear;
    // var searchEndYear = searchObject.searchEndYear;

    runQuery: function(searchTerm, searchStartYear, searchEndYear) {

    var articles = []

    console.log(searchTerm);
    console.log(searchStartYear);
    console.log(searchEndYear);

    // Figure out the geolocation
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIKey + '&q=' + searchTerm + '&begin_date=' + searchStartYear + '0101&end_date=' + searchEndYear + '1231';
    console.log(queryURL)
    return axios.get(queryURL).then(function(res) {
      console.log(res)
      // If get get a result, return that result's formatted address property
      if (res) {
        for (var i = 0; i<res.data.response.docs.length; i++){
                  articles.push(res.data.response.docs[i]);
        }
        // return articles;
      }

      // If we don't get any results, return the empty array
      return articles;
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postSavedArticle: function(headline, url, date) {
    return axios.post("/api/saved", {
      headline: headline,
      url: url,
      date: date
    });
  },
  
  deleteArticle: function(id) {
    return axios.delete("/api/saved/" + id);
  },

};

// We export the API helper
module.exports = helpers;
