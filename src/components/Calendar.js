var React = require('react');
var moment = require('moment');

var EventStore = require('../stores/EventStore');

var GridMonth   = require('./GridMonth');
var DetailsPane = require('./DetailsPane');
var ArrowButton = require('./ArrowButton');

var Calendar = React.createClass({

  getInitialState: function () {
    return {
      curMoment: moment(),
      selectedType: 'month',
      events: EventStore.getAll()
    }
  },

  componentDidMount() {
    EventStore.addChangeListener(() => this.setState({events: EventStore.getAll()}));
  },

  render: function () {

    var monthMoment = this.state.curMoment;

    return (
      <div className="row">
        <div className="col-sm-9">

          <h3 className="text-center">
            <ArrowButton direction="left" onClick={this.prevMonth} style={{float: 'left'}} />
            {monthMoment.format('MMMM')} - {monthMoment.format('YYYY')}
            <ArrowButton direction="right" onClick={this.nextMonth} style={{float: 'right'}} />
          </h3>

          <GridMonth
            curMoment={monthMoment}
            events={this.state.events}
            />
        </div>
        <div className="col-sm-3">
          <DetailsPane
            curMoment={monthMoment}
            events={this.state.events}
            />
        </div>
      </div>
    )
  },

  prevMonth: function () {
    this.setState({curMoment: this.state.curMoment.subtract(1, 'month')});
  },

  nextMonth: function () {
    this.setState({curMoment: this.state.curMoment.add(1, 'month')});
  },

  onSelectEvent(event) {
    this.setState({
      curMoment: event.moment,
      selectedType: 'event',
      selectedEvent: event
    });
  }

});

module.exports = Calendar;