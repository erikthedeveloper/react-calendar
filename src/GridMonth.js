var React = require('react');
var _     = require('lodash');
var moment = require('moment');

var GridDay  = require('./GridDay');
var DummyDay = require('./GridDay').GridDayDummy;

var GridMonth = React.createClass({

  render: function () {
    return (
      <div>
        {_dayBlocksForMonth.call(this, this.props.curMoment)}
      </div>
    )
  },

  eventsForDay: function (dayMoment) {
    var e = this.props.eventData;
    var m = dayMoment;
    return (e[m.year()] && e[m.year()][m.month()] && e[m.year()][m.month()][m.date()])
      ? e[m.year()][m.month()][m.date()]
      : [];
  }
});

function _dayBlocksForMonth(monthMoment) {

  var days = [];
  var daysInMonth = monthMoment.daysInMonth();

  var padDays = function (daysToPad) {
    while (daysToPad--) days.push(<DummyDay />);
  };

  padDays(monthMoment.clone().date(1).day());

  for (var i = 0; i < daysInMonth; i++) {
    var dayMoment = moment(monthMoment).date(i + 1);
    days.push(<GridDay
      curMoment={dayMoment}
      events={this.eventsForDay(dayMoment)}
      onClick={_.partial(this.props.onSelectDay, dayMoment)}
      onSelectEvent={this.props.onSelectEvent}
      />);
  }

  padDays(6 - monthMoment.clone().date(daysInMonth).day());

  return days;
}

module.exports = GridMonth;