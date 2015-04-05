var React = require('react');
var moment = require('moment');

var GridDay = React.createClass({

  render: function() {
    var dayFormatted = this.props.momentDate.format('MMMM Do');
    return (
      <div>
        <h3>{dayFormatted}</h3>
      </div>
    )
  }

});

module.exports = GridDay;