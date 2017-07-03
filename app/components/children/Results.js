// Include React
var React = require("react");


// Creating the Results component
var Results = React.createClass({

  handleSaveClick: function(article) {
  //If they click, saves the selected Article
    var headline = article.headline.main;
    var url = article.web_url;
    var date = article.pub_date;

    this.props.saveArticle(headline, url, date);
  },
  // Here we render the function
  render: function() {
  
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
        {/* Here we use a map function to loop through an array in JSX */}
          {this.props.results.map(function(article, i) {
              return (
                <div key={i}>
                <a href={article.web_url} target='_blank'><h3>{article.headline.main}</h3></a>
                <p>{article.date}</p>
                <button type="button" className="btn btn-primary"
                  onClick={()=>this.handleSaveClick(article)}
                  >Save</button>              >
                </div>
              );
            })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
