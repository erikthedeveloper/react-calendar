var React = require('react');
var moment = require('moment');
var EventStore   = require('../stores/EventStore');
var EventActions = require('../actions/EventActions');
var UserSelectedStore   = require('../stores/UserSelectedStore');
var UserSelectedActions = require('../actions/UserSelectedActions');
var ArrowButton     = require('./ArrowButton');
var FormAddDayEvent = require('./FormAddDayEvent');
var FormEditEvent = require('./FormEditEvent');

/**
 * <PaneNavUpButton />
 * @private
 */
var PaneNavUpButton = React.createClass({
  render() {
    return (
      <small style={{marginRight: 15}}>
        <ArrowButton onClick={this.onNavBack} direction="left" style={{float: 'left'}} />
      </small>
    );
  },

  onNavBack () {
    UserSelectedActions.paneNavUp();
  }
});

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
          onClick={this.onClickRemoveEvent}
          ></span>
        -
        <span
          style={{cursor: 'pointer'}}
          onClick={this.onClickViewEvent}
          >
          {event.title}
        </span>
      </li>
    );
  },

  onClickViewEvent() {
    UserSelectedActions.selectEvent(this.props.event.id);
  },

  onClickRemoveEvent() {
    EventActions.destroy(this.props.event.id)
  }

});

/**
 * <DetailsPane />
 */
var DetailsPane = React.createClass({

  render() {
    var paneContents = this.getPaneContents();
    return (
      <div>
        {paneContents}
      </div>
    )
  },

  getInitialState() {
    return {
      selectedType: UserSelectedStore.getPaneType()
    }
  },

  componentDidMount() {
    UserSelectedStore.addChangeListener(() => {
      return this.setState({
        selectedType:   UserSelectedStore.getPaneType()
      });
    });
  },

  getPaneContents() {
    var selectedMoment = UserSelectedStore.getMoment();
    var fallbackListing = <p><strong>Whoops!</strong> No events found!</p>;

    switch (this.state.selectedType) {

      case 'month':
        var groupedByDay = {};
        EventStore.getForMonth(selectedMoment).forEach((event) => {
          if (!groupedByDay[event.moment.date()]) groupedByDay[event.moment.date()] = [];
          groupedByDay[event.moment.date()].push(event);
        });
        return (
          <div>
            <h3>{selectedMoment.format('MMMM')}</h3>
            {(Object.keys(groupedByDay).length === 0)
              ? fallbackListing
              : Object.keys(groupedByDay)
                .map((dayNum) => {
                  var dayDate = moment(selectedMoment).date(dayNum);
                  return (
                    <div key={dayNum}>
                      <h5 className="lead">{dayDate.format('ddd Do')}</h5>
                      <ul>
                        {groupedByDay[dayDate.date()].map((event) => <EventListItem event={event} key={event.id} />)}
                      </ul>
                    </div>
                  )
                })}
          </div>
        );

      case 'day':
        var dayEvents = EventStore.getForDay(selectedMoment);
        return (
          <div>
            <h3><PaneNavUpButton /> {selectedMoment.format('MMMM ddd Do')}</h3>
            <FormAddDayEvent moment={selectedMoment} />
            <hr />
            {(dayEvents.length === 0)
              ? fallbackListing
              : <ul>
                  {dayEvents.map((event) => <EventListItem event={event} key={event.id} />) }
                </ul>}
          </div>
        );

      case 'event':
        var event = UserSelectedStore.getEvent();
        return (
          <div>
            <h5><PaneNavUpButton /> {event.title}</h5>
            <FormEditEvent event={event} />
          </div>
        );
    }
  }

});

module.exports = DetailsPane;