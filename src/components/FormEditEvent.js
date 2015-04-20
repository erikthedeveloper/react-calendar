var React = require('react');
var EventActions = require('../actions/EventActions');
let InputBinder  = require('./mixins/InputBinder');

/**
 * <FormEditEvent event={event} />
 *  Update title, date, and notes
 */
var FormEditEvent = React.createClass({
  mixins: [InputBinder],

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
          onChange={this.bindInputValue('title')}
          onSubmit={this.updateEvent}
          value={this.state.title}
          type="text"
          className="form-control input-md"
          />
        <input
          type="date"
          value={this.state.dateArgs}
          onChange={this.bindInputValue('dateArgs')}
          className="form-control input-md"
          />
        <textarea
          value={this.state.notes}
          onChange={this.bindInputValue('notes')}
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

  updateEvent() {
    var updateEventData = {
      title: this.state.title.trim(),
      dateArgs: this.state.dateArgs,
      notes: this.state.notes.trim()
    };

    if (updateEventData.title.length === 0)
      return;

    EventActions.update(this.props.event.id, updateEventData);
  }
});

module.exports = FormEditEvent;