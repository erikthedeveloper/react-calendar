var AppDispatcher = require('../AppDispatcher');

var _actions = {
  SELECT_DAY:   'SELECT_DAY',
  SELECT_EVENT: 'SELECT_EVENT',
  PANE_NAV_UP:  'PANE_NAV_UP'
};

var UserSelectedActions = {

  selectDay: function (dateArgs) {
    AppDispatcher.dispatch({
      actionType: _actions.SELECT_DAY,
      dateArgs:   dateArgs
    });
  },

  selectEvent: function (eventId) {
    AppDispatcher.dispatch({
      actionType: _actions.SELECT_EVENT,
      eventId:    eventId
    });
  },

  paneNavUp: function () {
    AppDispatcher.dispatch({
      actionType: _actions.PANE_NAV_UP
    });
  }

};

module.exports             = UserSelectedActions;
module.exports.actionNames = _actions;