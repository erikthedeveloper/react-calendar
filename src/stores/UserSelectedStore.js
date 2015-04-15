var _             = require('lodash');
var moment        = require('moment');
var AppDispatcher = require('../AppDispatcher');
var ActionNames   = require('../actions/UserSelectedActions').actionNames;
var ChangeEmitter = require('./ChangeEmitter');
var EventStore    = require('./EventStore');

var _selectedDay;
var _selectedType;
var _selectedEventId;

/**
 * @extends ChangeEmitter
 */
var UserSelectedStore = _.assign({}, ChangeEmitter, {

  /**
   * @return {moment}
   */
  selectedDay() {
    return _selectedDay;
  },

  /**
   * @return {string}
   */
  selectedType() {
    return _selectedType;
  },

  /**
   * @return {*}
   */
  selectedEvent() {
    return EventStore.get(_selectedEventId);
  }

});

UserSelectedStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case ActionNames.SELECT_DAY:
      _selectedDay  = moment(action.dateArgs);
      _selectedType = 'day';
      UserSelectedStore.emitChange();
      break;

    case ActionNames.SELECT_EVENT:
      _selectedEventId = action.eventId;
      _selectedType    = 'event';
      if (!_selectedDay)
        _selectedDay = EventStore.get(_selectedEventId).moment;
      UserSelectedStore.emitChange();
      break;

    case ActionNames.PANE_NAV_UP:
      _selectedType = _selectedType === 'event'
        ? 'day'
        : 'month';
      UserSelectedStore.emitChange();
      break;
  }

  return true;

});

module.exports = UserSelectedStore;