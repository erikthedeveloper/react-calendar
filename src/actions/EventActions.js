var AppDispatcher = require('../AppDispatcher');

var _actions = {
  EVENT_CREATE:  'EVENT_CREATE',
  EVENT_UPDATE:  'EVENT_UPDATE',
  EVENT_DESTROY: 'EVENT_DESTROY'
};

var EventActions = {
  create(eventData) {
    AppDispatcher.dispatch({
      actionType: _actions.EVENT_CREATE,
      eventData: eventData
    });
  },

  update(eventId, eventData) {
    AppDispatcher.dispatch({
      actionType: _actions.EVENT_UPDATE,
      eventId: eventId,
      eventData: eventData
    });
  },

  destroy(eventId) {
    AppDispatcher.dispatch({
      actionType: _actions.EVENT_DESTROY,
      eventId: eventId
    });
  }
};

module.exports = EventActions;
module.exports.actionNames = _actions;