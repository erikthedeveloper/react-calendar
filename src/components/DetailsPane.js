var React = require('react');
var moment = require('moment');

var EventStore   = require('../stores/EventStore');
var EventActions = require('../actions/EventActions');
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
        var monthEvents = EventStore.getForMonth(curMoment);
        var groupedByDay = {};
        monthEvents.forEach((event) => {
          if (!groupedByDay[event.moment.date()]) groupedByDay[event.moment.date()] = [];
          groupedByDay[event.moment.date()].push(event);
        });
        return (
          <div>
            <h3>{curMoment.format('MMMM')}</h3>
            {Object.keys(groupedByDay)
              .map((dayNum) => {
                var dayDate = moment(curMoment).date(dayNum);
                return (
                  <div>
                    <h5>{dayDate.format('ddd Do')}</h5>
                    <ul>
                      {groupedByDay[dayDate.date()].map((event) =>
                        <li
                          onClick={this.removeEvent.bind(null, event)}
                          style={{cursor: 'pointer'}}>
                          {event.title}
                        </li>)}
                    </ul>
                  </div>
                )
              })
            }
          </div>
        );

      case 'day':
        var dayEvents = EventStore.getForDay(curMoment);
        return (
          <div>
            <h3>
              {backArrow}
              {curMoment.format('MMMM ddd Do')}
            </h3>
            <input onSubmit={this.addEvent} ref="newEventTitle" type="text" className="form-control input-md" />
            <button onClick={this.addEvent} className="btn btn-md btn-block btn-primary">Add Event</button>
            <ul>
            {dayEvents.map((event) =>
              <li onClick={this.removeEvent.bind(null, event)} style={{cursor: 'pointer'}}>{event.title}</li>) }
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

  addEvent() {
    var newEventData = {
      title: React.findDOMNode(this.refs['newEventTitle']).value,
      moment: this.props.curMoment
    };

    EventActions.create(newEventData);
    React.findDOMNode(this.refs['newEventTitle']).value = "";
    React.findDOMNode(this.refs['newEventTitle']).focus();

  },

  removeEvent(targetEvent) {
    EventActions.destroy(targetEvent.id);
  }

});

module.exports = DetailsPane;