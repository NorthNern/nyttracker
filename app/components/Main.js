// Include React
var React = require("react");

// // Including the Link component from React Router to navigate within our application without full page reloads
// var Link = require("react-router").Link;

// Here we include all of the sub-components
var Search = require("./children/Search");
var Saved = require("./children/Saved"); 
var Results = require("./children/Results");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Create the Parent Component
var Main = React.createClass({

   // Here we set a generic state with search terms, initial results and saved articles emptied out
  getInitialState: function() {
    return {
      searchTerm: "",
      searchStartYear: "",
      searchEndYear: "",
      results: [],
      saved: []
    };
  },

      // The moment the page renders get the History
  componentDidMount: function() {
     helpers.getSaved().then(function(response) {
      if (response !== this.state.history) {
        console.log("saved: ", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },


  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the address
    helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(data) {
    // helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("search: ", data);
        this.setState({ results: data });
      }
    }.bind(this));
  },

  // This function allows childrens to update the parent
  // setSearch: function(term, start, end) {
  //   this.setState({
  //     searchTerm: term,
  //     searchStartYear: start,
  //     searchEndYear: end
  //   });
  // },
  setSearch: function(searchObject) {
    console.log("searchObject at main: ")
    console.log(searchObject)
    this.setState({
      searchTerm: searchObject.term,
      searchStartYear: searchObject.start,
      searchEndYear: searchObject.end
    });
  },

  saveArticle: function(headline, url, date) {
    helpers.postSavedArticle(headline, url, date).then(function(response) {
      this.setState({
        headline: headline,
        url: url,
        date: date
      });
    }.bind(this));
  },

  deleteArticle: function(id) {
    helpers.deleteSaved(id);
  },


  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times!</h2>
            <p className="text-center">
              <em>Enter an article to search for it (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Search setSearch={this.setSearch} />

          </div>


          <div className="col-md-6">

            <Results results={this.state.results} saveArticle={this.saveArticle}/>

          </div>

        </div>

        <div className="row">

          <Saved saved={this.state.saved} deleteArticle={this.deleteArticle}/>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
