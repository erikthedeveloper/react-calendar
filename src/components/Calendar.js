var React = require('react');
var moment = require('moment');

var EventStore = require('../stores/EventStore');
var UserSelectedStore = require('../stores/UserSelectedStore');

var UserSelectedActions = require('../actions/UserSelectedActions');

var GridMonth   = require('./GridMonth');
var DetailsPane = require('./DetailsPane');
var ArrowButton = require('./ArrowButton');

var Calendar = React.createClass({

  getInitialState: function () {
    return {
      selectedMoment: UserSelectedStore.getMoment(),
      selectedType: UserSelectedStore.getPaneType(),
      events: EventStore.getAll()
    }
  },

  componentDidMount() {
    EventStore.addChangeListener(() => this.setState({events: EventStore.getAll()}));
    UserSelectedStore.addChangeListener(() => this.setState({
      selectedMoment: UserSelectedStore.getMoment()
    }));
  },

  render: function () {

    var monthMoment = this.state.selectedMoment;

    return (
      <div className="row">
        <div className="col-sm-9">

          <h3 className="text-center">
            <ArrowButton direction="left" onClick={this.prevMonth} style={{float: 'left'}} />
            {monthMoment.format('MMMM')} - {monthMoment.format('YYYY')}
            <ArrowButton direction="right" onClick={this.nextMonth} style={{float: 'right'}} />
          </h3>

          <GridMonth
            selectedMoment={monthMoment}
            events={this.state.events}
            />
        </div>
        <div className="col-sm-3">
          <DetailsPane
            selectedMoment={monthMoment}
            events={this.state.events}
            />
        </div>
      </div>
    )
  },

  prevMonth: function () {
    UserSelectedActions.monthNavPrev();
  },

  nextMonth: function () {
    UserSelectedActions.monthNavNext();
  }

});

module.exports = Calendar;