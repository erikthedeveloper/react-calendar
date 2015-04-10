var React = require('react');
var moment = require('moment');

var GridMonth = require('./GridMonth');

var DetailsPain = React.createClass({

  render: function () {
    return (
      <div>
        Hola
      </div>
    )
  }

});

module.exports = React.createClass({

  getInitialState: function () {
    return {
      momentDate: moment()
    }
  },

  render: function () {

    return (
      <div>

        <a onClick={this.prevMonth}>Prev</a>
        <a onClick={this.nextMonth}>Next</a>

        <GridMonth momentDate={this.state.momentDate} />

      </div>
    )
  },

  prevMonth: function () {
    this.setState({momentDate: this.state.momentDate.subtract(1, 'month')})
  },

  nextMonth: function () {
    this.setState({momentDate: this.state.momentDate.add(1, 'month')})
  }

});