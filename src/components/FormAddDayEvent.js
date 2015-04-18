var React = require('react');
var EventActions = require('../actions/EventActions');

/**
 * <AddDayEventForm moment={moment(dateArgs)} />
 */
var FormAddDayEvent = React.createClass({
  propTypes: {
    moment: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      newTitle: ''
    }
  },

  render() {
    return (
      <div>
        <input
          ref="newEventTitle"
          onChange={this.onTitleChanged}
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

  onTitleChanged(e) {
    this.setState({newTitle: e.target.value.trim()});
  },

  addEvent() {
    var titleInput   = React.findDOMNode(this.refs['newEventTitle']);
    var newEventData = {
      title: this.state.newTitle,
      moment: this.props.moment
    };

    if (newEventData.title.length === 0 )
      return;

    EventActions.create(newEventData);
    titleInput.value = "";
    titleInput.focus();

  }
});

module.exports = FormAddDayEvent;