var React = require('react');
var moment = require('moment');

var GridMonth = require('./GridMonth');

var Calendar = React.createClass({

  getInitialState: function () {
    return {
      curMoment: moment()
    }
  },

  render: function () {

    return (
      <div>

        <a onClick={this.prevMonth}><span className="glyphicon glyphicon-arrow-left"></span></a>
        <a onClick={this.nextMonth}><span className="glyphicon glyphicon-arrow-right"></span></a>

        <GridMonth curMoment={this.state.curMoment} eventData={this.props.eventData}/>

      </div>
    )
  },

  prevMonth: function () {
    this.setState({curMoment: this.state.curMoment.subtract(1, 'month')})
  },

  nextMonth: function () {
    this.setState({curMoment: this.state.curMoment.add(1, 'month')})
  }

});

module.exports = Calendar;