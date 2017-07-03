// Include React
var React = require("react");

// Creating the Form component
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "", start: "", end: "" };
  },

  // This function will respond to the user input
  handleTermChange: function(event) {

    this.setState({ term: event.target.value });

  },

  handleStartYearChange: function(event) {

    this.setState({ start: event.target.value });

  },

  handleEndYearChange: function(event) {

    this.setState({ end: event.target.value });

  },
  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    var searchObject = {
      term: this.state.term,
      start: this.state.start,
      end: this.state.end
    }
    // Set the parent to have the search term plus start and end dates as object keys
    this.props.setSearch(searchObject);

    //clearing out search
    this.setState({
      term:"",
      start:"",
      end:""
    })
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Article search term:</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleTermChange}
                required
              />
              <br />
              <label>Start Year: </label>              
              <input
                value={this.state.start}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleStartYearChange}
                required
              />
              <br />
              <label>End Year: </label>
              <input
                value={this.state.end}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleEndYearChange}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
