var _             = require('lodash');
var moment        = require('moment');
var EventEmitter  = require('events').EventEmitter;
var AppDispatcher = require('../AppDispatcher');
var AppActions    = require('../actions/actions');

var _events = {};

// TEMP - Dummy makeId function
var _curId = 0;
var makeId = function () {
  return ++_curId;
};

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
  var eventId = makeId();
  _events[eventId] = {
    id: eventId,
    title: dummyEvent.title,
    moment: moment(dummyEvent.dateArgs)
  };
});
// TEMP END - Dummy Data


/**
 * @extends EventEmitter.prototype
 */
var CHANGE_EVENT = 'CHANGE_EVENT';
var changeEmitterPrototype = _.assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

/**
 * @extends changeEmitterPrototype
 */
var EventStore = _.assign({}, changeEmitterPrototype, {

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
    return _.filter(_events, (event) => {
      return moment(dayMoment).isSame(event.moment, 'day');
    })
  },

  /**
   * @param monthMoment
   * @return {[]}
   */
  getForMonth: function (monthMoment) {
    return _.filter(_events, (event) => moment(monthMoment).isSame(event.moment, 'month'))
  }

});

/**
 * @param eventData {*}
 */
var _createEvent = function (eventData) {
  var eventId = makeId();

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
    case AppActions.EVENT_CREATE:
      _createEvent(action.eventData);
      EventStore.emitChange();
      break;

    case AppActions.EVENT_DESTROY:
      _destroyEvent(action.eventId);
      EventStore.emitChange();
      break;
  }

  return true;

});

module.exports = EventStore;