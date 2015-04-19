var React = require('react');
var EventActions = require('../actions/EventActions');

var FormEditEvent = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  getInitialState() {
    var curEvent = this.props.event;
    return {
      title: curEvent.title,
      dateArgs: curEvent.moment.format("YYYY-MM-DD")
    }
  },

  render() {
    return (
      <div>
        <input
          ref="eventTitle"
          onChange={this.onTitleChanged}
          onSubmit={this.updateEvent}
          value={this.state.title}
          type="text"
          className="form-control input-md" />
        <input
          type="date"
          value={this.state.dateArgs}
          onChange={this.onDateChanged}
          />
        <button
          onClick={this.updateEvent}
          className="btn btn-md btn-block btn-primary">
          Save
        </button>
      </div>
    );
  },

  onTitleChanged(e) {
    this.setState({title: e.target.value.trimRight()});
  },

  onDateChanged(e) {
    this.setState({dateArgs: e.target.value});
  },

  updateEvent() {
    var titleInput   = React.findDOMNode(this.refs['eventTitle']);
    var updateEventData = {
      title: this.state.title,
      dateArgs: this.state.dateArgs
    };

    if (updateEventData.title.length === 0 )
      return;

    EventActions.update(this.props.event.id, updateEventData);
    titleInput.value = "";
    titleInput.focus();

  }
});

module.exports = FormEditEvent;