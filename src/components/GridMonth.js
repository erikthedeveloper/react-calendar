var React = require('react');
var _     = require('lodash');
var moment = require('moment');

var GridDay  = require('./GridDay');
var DummyDay = require('./GridDay').GridDayDummy;

var styles = {
  dayHeading: {
    float: 'left',
    width: 100/7 + '%',
    textAlign: 'center'
  }
};

var GridMonth = React.createClass({

  render: function () {
    var monthMoment = this.props.curMoment;
    return (
      <div>
        {moment.weekdaysShort().map((day) =>
          <div style={styles.dayHeading}>{day}</div>)}
        {this.renderDayBlocks(monthMoment)}
      </div>
    )
  },

  renderDayBlocks(monthMoment) {
    var dayBlocks = [];
    var daysInMonth = monthMoment.daysInMonth();
    var eventData   = this.props.eventData;

    var padDays = function (daysToPad) {
      while (daysToPad--) dayBlocks.push(<DummyDay />);
    };

    padDays(monthMoment.clone().date(1).day());

    for (var i = 1; i <= daysInMonth; i++) {
      var dayMoment = moment(monthMoment).date(i);
      dayBlocks.push(<GridDay
        curMoment={dayMoment}
        events={eventData.eventsForDay(dayMoment)}
        onClick={_.partial(this.props.onSelectDay, dayMoment)}
        onSelectEvent={this.props.onSelectEvent}
        />);
    }

    padDays(6 - monthMoment.clone().date(daysInMonth).day());

    return dayBlocks;
  }

});

module.exports = GridMonth;