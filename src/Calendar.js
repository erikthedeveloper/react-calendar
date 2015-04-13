var React = require('react');
var moment = require('moment');

var GridMonth = require('./GridMonth');
var DetailsPane = require('./DetailsPane');

var ArrowButton = require('./components/ArrowButton');

var Calendar = React.createClass({

  getInitialState: function () {
    return {
      curMoment: moment(),
      selectedType: 'month'
    }
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
            eventData={this.props.eventData}
            />
        </div>
        <div className="col-sm-3">
          <DetailsPane
            curMoment={monthMoment}
            selectedType={this.state.selectedType}
            selectedEvent={this.state.selectedEvent}
            eventData={this.props.eventData}
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