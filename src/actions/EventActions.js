var AppDispatcher = require('../AppDispatcher');
var AppActions    = require('./actions');

var EventActions = {
  create: function (eventData) {
    AppDispatcher.dispatch({
      actionType: AppActions.EVENT_CREATE,
      eventData: eventData
    });
  },

  destroy: function (targetEvent) {
    AppDispatcher.dispatch({
      actionType: AppActions.EVENT_DESTROY,
      targetEvent: targetEvent
    });
  }
};

module.exports = EventActions;