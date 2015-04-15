var React = require('react');
var moment = require('moment');

var EventStore   = require('../stores/EventStore');
var EventActions = require('../actions/EventActions');
var ArrowButton = require('./ArrowButton');

/**
 * <EventListItem event={eventObject} />
 * @private
 */
var EventListItem = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render() {
    var event = this.props.event;
    return (
      <li>
        <span
          className="glyphicon glyphicon-remove"
          style={{cursor: 'pointer'}}
          onClick={EventActions.destroy.bind(null, event.id)}
          ></span>
        {event.title}
      </li>
    );
  }
});

/**
 * <AddDayEventForm moment={moment(dateArgs)} />
 * @private
 */
var AddDayEventForm = React.createClass({
  propTypes: {
    moment: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <input
          ref="newEventTitle"
          onSubmit={this.addEvent}
          type="text"
          className="form-control input-md" />
        <button
          onClick={this.addEvent}
          className="btn btn-md btn-block btn-primary">
          Add Event
        </button>
      </div>
    );
  },

  addEvent() {
    var newEventData = {
      title: React.findDOMNode(this.refs['newEventTitle']).value,
      moment: this.props.moment
    };

    EventActions.create(newEventData);
    React.findDOMNode(this.refs['newEventTitle']).value = "";
    React.findDOMNode(this.refs['newEventTitle']).focus();

  }
});

/**
 * <DetailsPane />
 */
var DetailsPane = React.createClass({

  render: function () {
    var paneContents = this.getPaneContents();
    return (
      <div>
        {paneContents}
      </div>
    )
  },

  getPaneContents: function () {
    var curMoment = this.props.curMoment;
    var backArrow = (
      <small style={{marginRight: 15}}>
        <ArrowButton onClick={this.props.backToMonth} direction="left" style={{float: 'left'}} />
      </small>
    );
    var fallbackListing = <p><strong>Whoops!</strong> No events found!</p>;

    switch (this.props.selectedType) {

      case 'month':
        var groupedByDay = {};
        EventStore.getForMonth(curMoment).forEach((event) => {
          if (!groupedByDay[event.moment.date()]) groupedByDay[event.moment.date()] = [];
          groupedByDay[event.moment.date()].push(event);
        });
        return (
          <div>
            <h3>{curMoment.format('MMMM')}</h3>
            {(Object.keys(groupedByDay).length === 0)
              ? fallbackListing
              : Object.keys(groupedByDay)
                .map((dayNum) => {
                  var dayDate = moment(curMoment).date(dayNum);
                  return (
                    <div>
                      <h5 className="lead">{dayDate.format('ddd Do')}</h5>
                      <ul>
                        {groupedByDay[dayDate.date()].map((event) => <EventListItem event={event} />)}
                      </ul>
                    </div>
                  )
                })}
          </div>
        );

      case 'day':
        var dayEvents = EventStore.getForDay(curMoment);
        return (
          <div>
            <h3>{backArrow} {curMoment.format('MMMM ddd Do')}</h3>
            <AddDayEventForm moment={curMoment} />
            <hr />
            {(dayEvents.length === 0)
              ? fallbackListing
              : <ul>
                  {dayEvents.map((event) => <EventListItem event={event} />) }
                </ul>}
          </div>
        );

      case 'event':
        var event = this.props.selectedEvent;
        return (
          <div>
            <h3>{backArrow} {event.title}</h3>
            <p>
              <strong>{curMoment.format('MMMM ddd Do')}</strong> Some event details here...
            </p>
          </div>
        );
    }
  }

});

module.exports = DetailsPane;