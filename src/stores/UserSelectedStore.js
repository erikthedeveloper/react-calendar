var _             = require('lodash');
var moment        = require('moment');
var AppDispatcher = require('../AppDispatcher');
var ActionNames   = require('../actions/UserSelectedActions').actionNames;
var ChangeEmitter = require('./ChangeEmitter');
var EventStore    = require('./EventStore');

var _moment = moment();
var _paneType = 'month';
var _eventId;

/**
 * @extends ChangeEmitter
 */
var UserSelectedStore = _.assign({}, ChangeEmitter, {

  /**
   * @return {moment}
   */
  getMoment() {
    return _moment;
  },

  /**
   * @return {string}
   */
  getPaneType() {
    return _paneType;
  },

  /**
   * @return {*}
   */
  getEvent() {
    return EventStore.get(_eventId);
  }

});

UserSelectedStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case ActionNames.SELECT_DAY:
      _moment  = moment(action.dateArgs);
      _paneType = 'day';
      UserSelectedStore.emitChange();
      break;

    case ActionNames.SELECT_EVENT:
      _eventId = action.eventId;
      _paneType    = 'event';
      if (!_moment)
        _moment = EventStore.get(_eventId).moment;
      UserSelectedStore.emitChange();
      break;

    case ActionNames.PANE_NAV_UP:
      _paneType = _paneType === 'event'
        ? 'day'
        : 'month';
      UserSelectedStore.emitChange();
      break;

    case ActionNames.MONTH_NAV_PREV:
      _moment.subtract(1, 'month');
      _paneType = 'month';
      UserSelectedStore.emitChange();
      break;

    case ActionNames.MONTH_NAV_NEXT:
      _moment.add(1, 'month');
      _paneType = 'month';
      UserSelectedStore.emitChange();
      break;
  }

  return true;

});

module.exports = UserSelectedStore;