var React = require('react');
var moment = require('moment');

var GridDay = React.createClass({

  render: function() {
    var dayFormatted = this.props.momentDate.format('ddd Do');
    var styles = {
      height: 100,
      width: 100,
      float: 'left',
      border: '1px solid gray',
      boxSizing: 'border-box'
    };
    if (this.props.momentDate.day() === 0) {
      styles.clear = 'left';
    }
    if (this.props.momentDate.date() === 1) {
      styles.marginLeft = 100 * (this.props.momentDate.day());
    }
    return (
      <div style={styles}>
        <h3>{dayFormatted}</h3>
      </div>
    )
  }

});

module.exports = GridDay;