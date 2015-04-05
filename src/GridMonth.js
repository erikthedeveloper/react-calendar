var React = require('react');
var moment = require('moment');

var GridDay = require('./GridDay');

var GridMonth = React.createClass({

  getInitialState: function () {
    return {
      momentDate: this.props.initialMomentDate
    }
  },

  render: function () {
    var momentDate = this.state.momentDate;
    var monthName = momentDate.format('MMMM');
    var yearName = momentDate.format('YYYY');

    var dayBlocks = _dayBlocksForMonth(momentDate);

    return (
      <div>
        <h3 className="text-center">{monthName} - {yearName}</h3>{dayBlocks}
      </div>
    )
  }

});

function _dayBlocksForMonth(momentDate) {

  var dayBlockComponents = [];
  var daysInMonth = momentDate.daysInMonth();
  var dayMoment;
  var i;

  for (i = 0; i < daysInMonth; i++) {
    dayMoment = momentDate.clone();
    dayMoment.date(i + 1);
    dayBlockComponents.push(<GridDay
      momentDate={dayMoment}
      />);
  }

  return dayBlockComponents;
}

module.exports = GridMonth;