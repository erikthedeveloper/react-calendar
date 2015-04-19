var React = require('react');
var EventActions = require('../actions/EventActions');

/**
 * <FormEditEvent event={event} />
 *  Update title, date, and notes
 */
var FormEditEvent = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    this.setStateFromEvent(this.props.event);
  },

  componentWillReceiveProps(nextProps) {
    this.setStateFromEvent(nextProps.event);
  },

  setStateFromEvent(event) {
    this.setState({
      title: event.title,
      dateArgs: event.moment.format("YYYY-MM-DD"),
      notes: event.notes || ""
    })
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
          className="form-control input-md"
          />
        <input
          type="date"
          value={this.state.dateArgs}
          onChange={this.onDateChanged}
          className="form-control input-md"
          />
        <textarea
          value={this.state.notes}
          onChange={this.onNotesChanged}
          className="form-control input-md"
          rows="4"
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

  onNotesChanged(e) {
    this.setState({notes: e.target.value});
  },

  updateEvent() {
    var updateEventData = {
      title: this.state.title,
      dateArgs: this.state.dateArgs,
      notes: this.state.notes
    };

    if (updateEventData.title.length === 0)
      return;

    EventActions.update(this.props.event.id, updateEventData);
  }
});

module.exports = FormEditEvent;