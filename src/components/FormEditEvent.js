var React = require('react');
var EventActions = require('../actions/EventActions');

var FormEditEvent = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  getInitialState() {
    var curEvent = this.props.event;
    return {
      title: curEvent.title
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

  updateEvent() {
    var titleInput   = React.findDOMNode(this.refs['eventTitle']);
    var updateEventData = {
      title: this.state.title
    };

    if (updateEventData.title.length === 0 )
      return;

    EventActions.update(this.props.event.id, updateEventData);
    titleInput.value = "";
    titleInput.focus();

  }
});

module.exports = FormEditEvent;