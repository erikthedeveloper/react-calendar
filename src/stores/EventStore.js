var _             = require('lodash');
var moment        = require('moment');
var AppDispatcher = require('../AppDispatcher');
var ActionNames   = require('../actions/EventActions').actionNames;
var ChangeEmitter = require('./ChangeEmitter');

var _events = {};

/**
 * @extends ChangeEmitter
 */
var EventStore = _.assign({}, ChangeEmitter, {

  get: function (id) {
   return _events[id];
  },

  getAll: function () {
    return _events;
  },

  /**
   * @param dayMoment
   * @return {[]}
   */
  getForDay: function (dayMoment) {
    return _.filter(_events, (event) => moment(dayMoment).isSame(event.moment, 'day'))
  },

  /**
   * @param monthMoment
   * @return {[]}
   */
  getForMonth: function (monthMoment) {
    return _.filter(_events, (event) => moment(monthMoment).isSame(event.moment, 'month'))
  }

});

// TEMP - Dummy _makeId function
var _curId = 0;
var _makeId = function () {
  return ++_curId;
};

/**
 * @param eventData {*}
 */
var _createEvent = function (eventData) {
  var eventId = _makeId();

  if (!moment.isMoment(eventData.moment))
    throw new Exception("WTF give a moment date object man...");

  _events[eventId] = _.assign(eventData, {
    id: eventId
  });
  return eventId;
};

/**
 * @param eventId {number}
 */
var _destroyEvent = function (eventId) {
  delete _events[eventId];
};

EventStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case ActionNames.EVENT_CREATE:
      _createEvent(action.eventData);
      EventStore.emitChange();
      break;

    case ActionNames.EVENT_DESTROY:
      _destroyEvent(action.eventId);
      EventStore.emitChange();
      break;
  }

  return true;

});

module.exports = EventStore;

// TEMP - Dummy Data
var DATA_SOURCE = [
  {dateArgs: [2015, 3, 3], title: 'HEYYYYY April 3rd'},
  {dateArgs: [2015, 3, 3], title: 'And another... April 3rd'},
  {dateArgs: [2015, 3, 10], title: 'My Birthday!'},
  {dateArgs: [2015, 4, 5 ], title: 'Sinco De Mayo!'},
  {dateArgs: [2015, 4, 14], title: 'Just another day...'},
  {dateArgs: [2015, 4, 14], title: 'The 14th!'}
];
DATA_SOURCE.forEach(function (dummyEvent) {
  var eventId = _makeId();
  _events[eventId] = {
    id: eventId,
    title: dummyEvent.title,
    moment: moment(dummyEvent.dateArgs)
  };
});
// TEMP END - Dummy Data