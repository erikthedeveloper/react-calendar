var React = require('react');
var moment = require('moment');

var ArrowButton = require('./ArrowButton');


var DetailsPane = React.createClass({

  render: function () {
    var paneContents = this.getPaneContents();
    return (
      <div>
        {paneContents}
      </div>
    )
  },

  propTypes: {

  },

  getInitialState() {
    return {

    }
  },

  getPaneContents: function () {
    var curMoment = this.props.curMoment;
    var backArrow = (
      <small style={{marginRight: 15}}>
        <ArrowButton onClick={this.props.backToMonth} direction="left" style={{float: 'left'}} />
      </small>
    );

    switch (this.props.selectedType) {

      case 'month':
        var monthEvents = this.eventsForMonth(curMoment);
        return (
          <div>
            <h3>{curMoment.format('MMMM')}</h3>
            {Object.keys(monthEvents)
              .map((dayNum) => moment(curMoment).date(dayNum))
              .map((day) =>
                    <div>
                      <h5>{day.format('ddd Do')}</h5>
                      <ul>
                        {monthEvents[day.date()].map((event) =>
                          <li>{event.title}</li>)}
                      </ul>
                    </div>)
            }
          </div>
        );

      case 'day':
        var dayEvents = this.eventsForDay(curMoment);
        return (
          <div>
            <h3>
              {backArrow}
              {curMoment.format('MMMM ddd Do')}
            </h3>
            <ul>
            {dayEvents.map((event) =>
              <li>{event.title}</li>) }
            </ul>
          </div>
        );

      case 'event':
        var event = this.props.selectedEvent;
        return (
          <div>
            <h3>
              {backArrow}
              {event.title}
            </h3>
            <p>
              Some event details...
            </p>
          </div>
        );

      default:
        return (
          <div>
            Nothing selected!
          </div>
        );
    }
  },

  eventsForMonth: function (monthMoment) {
    var e = this.props.eventData;
    var m = monthMoment;
    return (e[m.year()] && e[m.year()][m.month()])
      ? e[m.year()][m.month()]
      : [];
  },

  eventsForDay: function (dayMoment) {
    var e = this.props.eventData;
    var m = dayMoment;
    return (e[m.year()] && e[m.year()][m.month()] && e[m.year()][m.month()][m.date()])
      ? e[m.year()][m.month()][m.date()]
      : [];
  }
});

module.exports = DetailsPane;