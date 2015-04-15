var React = require('react');
var EventActions = require('../actions/EventActions');

/**
 * <AddDayEventForm moment={moment(dateArgs)} />
 */
var FormAddDayEvent = React.createClass({
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

module.exports = FormAddDayEvent;