var React = require('react');
var moment = require('moment');

var EventData = require('../EventData');

var GridMonth   = require('./GridMonth');
var DetailsPane = require('./DetailsPane');
var ArrowButton = require('./ArrowButton');

var DATA_SOURCE = {
  2015: {
    3: {
      3: [
        {title: 'April 3rd'},
        {title: 'And another... April 3rd'}
      ],
      10: [ {title: 'My Birthday!'}]
    },
    4: {
      5: [{title: 'Sinco De Mayo!'}],
      14: [
        {title: 'Just another day...'},
        {title: 'The 14th!'}
      ]
    }
  }
};

// TODO: Yuck, I know :)
for (var year in DATA_SOURCE)
  for (var monthIndex in DATA_SOURCE[year])
    for (var date in DATA_SOURCE[year][monthIndex])
      for (var eventIndex in DATA_SOURCE[year][monthIndex][date])
        DATA_SOURCE[year][monthIndex][date][eventIndex]['moment'] = moment([year, monthIndex, date]);
var _eventData = new EventData(DATA_SOURCE);

var Calendar = React.createClass({

  getInitialState: function () {
    return {
      curMoment: moment(),
      selectedType: 'month',
      eventData: _eventData
    }
  },

  componentDidMount() {
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