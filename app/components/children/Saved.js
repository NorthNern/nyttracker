  // Include React
  var React = require("react");

  // This is the History component. It will be used to show a log of  recent searches.
  var Saved = React.createClass({

    //If they click, will delete the saved article
    handleDeleteClick: function(id) {
    this.props.deleteArticle(id);
  },

    // Here we describe this component's render method
    render: function() {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title text-center">Saved Articles</h2>
          </div>
          <div className="panel-body text-center">

            {/* Here we use a map function to loop through an array in JSX */}
            {this.props.saved.map(function(article, i) {
              return (
                <div key={i}>
                <a href={article.url} target='_blank'><h3>{article.headline}</h3></a>
                <p>{article.date}</p>
                <button type="button" className="btn btn-primary"
                  onClick={()=>this.handleDeleteClick(article._id)}
                  >Delete</button>              >
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  // Export the component back for use in other files
  module.exports = Saved;
