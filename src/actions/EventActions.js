var AppDispatcher = require('../AppDispatcher');

var _actions = {
  EVENT_CREATE:  'EVENT_CREATE',
  EVENT_DESTROY: 'EVENT_DESTROY'
};

var EventActions = {
  create: function (eventData) {
    AppDispatcher.dispatch({
      actionType: _actions.EVENT_CREATE,
      eventData: eventData
    });
  },

  destroy: function (eventId) {
    AppDispatcher.dispatch({
      actionType: _actions.EVENT_DESTROY,
      eventId: eventId
    });
  }
};

module.exports = EventActions;
module.exports.actionNames = _actions;