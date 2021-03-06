var React = require('react');
var _     = require('lodash');
var moment = require('moment');

var EventStore = require('../stores/EventStore');
var UserSelectedStore = require('../stores/UserSelectedStore');

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

  propTypes: {
    selectedMoment: React.PropTypes.object.isRequired
  },

  render() {
    var monthMoment = this.props.selectedMoment;
    return (
      <div>
        {moment.weekdaysShort().map((day) =>
          <div key={day} style={styles.dayHeading}>{day}</div>)}
        {this.renderDayBlocks(monthMoment)}
      </div>
    )
  },

  renderDayBlocks(monthMoment) {
    var dayBlocks = [];
    var daysInMonth = monthMoment.daysInMonth();
    var padDays = function (daysToPad) {
      while (daysToPad--) dayBlocks.push(<DummyDay key={`block_${dayBlocks.length}`} />);
    };

    padDays(monthMoment.clone().date(1).day());

    for (var i = 1; i <= daysInMonth; i++) {
      var dayMoment = moment(monthMoment).date(i);
      var isMonthMode = UserSelectedStore.getPaneType() !== 'month';
      dayBlocks.push(<GridDay
        key={`block_${dayBlocks.length}`}
        selectedMoment={dayMoment}
        events={EventStore.getForDay(dayMoment)}
        isActive={isMonthMode && dayMoment.isSame(this.props.selectedMoment, 'day')}
        />);
    }

    padDays(6 - monthMoment.clone().date(daysInMonth).day());

    return dayBlocks;
  }

});

module.exports = GridMonth;