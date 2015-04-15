var React = require('react');
var moment = require('moment');

var EventStore = require('../stores/EventStore');
var EventData = require('../EventData');

var GridMonth   = require('./GridMonth');
var DetailsPane = require('./DetailsPane');
var ArrowButton = require('./ArrowButton');

var _eventData  = new EventData({});
// TEMP - DummyData
var DATA_SOURCE = [
  {dateArgs: [2015, 3, 3], title: 'April 3rd'},
  {dateArgs: [2015, 3, 3], title: 'And another... April 3rd'},
  {dateArgs: [2015, 3, 10], title: 'My Birthday!'},
  {dateArgs: [2015, 4, 5 ], title: 'Sinco De Mayo!'},
  {dateArgs: [2015, 4, 14], title: 'Just another day...'},
  {dateArgs: [2015, 4, 14], title: 'The 14th!'}
];
DATA_SOURCE.forEach(function (dummyEvent) {
  _eventData.addEvent({title: dummyEvent.title}, moment(dummyEvent.dateArgs));
});
// TEMP END - DummyData

var Calendar = React.createClass({

  getInitialState: function () {
    return {
      curMoment: moment(),
      selectedType: 'month',
      eventData: _eventData
    }
  },

  componentDidMount() {
    EventStore.addChangeListener(() => alert('Change from EventStore caught from Calendar#componentDidMount!!'));
    _eventData.addSubscription(() => {
      this.setState({eventData: _eventData})
    });
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
            onSelectDay={this.onSelectDay}
            onSelectEvent={this.onSelectEvent}
            eventData={this.state.eventData}
            />
        </div>
        <div className="col-sm-3">
          <DetailsPane
            curMoment={monthMoment}
            selectedType={this.state.selectedType}
            selectedEvent={this.state.selectedEvent}
            eventData={this.state.eventData}
            backToMonth={() => this.setState({selectedType: 'month'})}
            />
        </div>
      </div>
    )
  },

  prevMonth: function () {
    this.setState({curMoment: this.state.curMoment.subtract(1, 'month')});
    return false;
  },

  nextMonth: function () {
    this.setState({curMoment: this.state.curMoment.add(1, 'month')});
    return false;
  },

  onSelectDay(dayMoment) {
    this.setState({
      curMoment: dayMoment,
      selectedType: 'day'
    });
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