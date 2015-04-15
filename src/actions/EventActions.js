var AppDispatcher = require('../AppDispatcher');
var AppActions    = require('./actions');

var EventActions = {
  create: function (eventData) {
    AppDispatcher.dispatch({
      actionType: AppActions.EVENT_CREATE,
      eventData: eventData
    });
  },

  destroy: function (eventId) {
    AppDispatcher.dispatch({
      actionType: AppActions.EVENT_DESTROY,
      eventId: eventId
    });
  }
};

module.exports = EventActions;