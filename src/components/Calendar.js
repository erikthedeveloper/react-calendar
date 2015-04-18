var React = require('react');
var EventStore = require('../stores/EventStore');
var UserSelectedStore   = require('../stores/UserSelectedStore');
var UserSelectedActions = require('../actions/UserSelectedActions');
var GridMonth   = require('./GridMonth');
var DetailsPane = require('./DetailsPane');
var ArrowButton = require('./ArrowButton');

/**
 * Bootstrap 3 Grid Calendar component w/ self-contained "Details Pane"
 */
var Calendar = React.createClass({

  render() {

    var monthMoment = this.state.selectedMoment;

    return (
      <div className="row">
        <div className="col-sm-9">

          <h3 className="text-center">
            <ArrowButton direction="left" onClick={this.prevMonth} style={{float: 'left'}} />
            {monthMoment.format('MMMM')} - {monthMoment.format('YYYY')}
            <ArrowButton direction="right" onClick={this.nextMonth} style={{float: 'right'}} />
          </h3>

          <GridMonth selectedMoment={monthMoment} events={this.state.events} />
        </div>
        <div className="col-sm-3">
          <DetailsPane selectedMoment={monthMoment} events={this.state.events} />
        </div>
      </div>
    )
  },

  getInitialState() {
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

  prevMonth() {
    UserSelectedActions.monthNavPrev();
  },

  nextMonth() {
    UserSelectedActions.monthNavNext();
  }

});

module.exports = Calendar;