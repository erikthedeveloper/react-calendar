var AppDispatcher = require('../AppDispatcher');

var _actions = {
  SELECT_DAY:   'SELECT_DAY',
  SELECT_EVENT: 'SELECT_EVENT',
  PANE_NAV_UP:  'PANE_NAV_UP',
  MONTH_NAV_PREV: 'MONTH_NAV_PREV',
  MONTH_NAV_NEXT: 'MONTH_NAV_NEXT'
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
  },

  monthNavPrev: function () {
    AppDispatcher.dispatch({
      actionType: _actions.MONTH_NAV_PREV
    });
  },

  monthNavNext: function () {
    AppDispatcher.dispatch({
      actionType: _actions.MONTH_NAV_NEXT
    });
  }

};

module.exports             = UserSelectedActions;
module.exports.actionNames = _actions;