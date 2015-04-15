var _             = require('lodash');
var EventEmitter  = require('events').EventEmitter;
var AppDispatcher = require('../AppDispatcher');
var AppActions    = require('../actions/actions');

var _events = {};

var CHANGE_EVENT = 'CHANGE_EVENT';

/**
 * @extends EventEmitter.prototype
 */
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

  create: function (eventData) {
    var eventId = _makeId();
    _events[eventId] = _.assign(eventData, {
      id: eventId
    });
    return eventId;
  },

  destroy: function () {
    var actionName = "EventStore#destroy";
    alert(actionName);
  }

});

EventStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case AppActions.EVENT_CREATE:
      EventStore.create({
        title: action.eventData.title
      });
      EventStore.emitChange();
      break;

    case AppActions.EVENT_DESTROY:
      EventStore.destroy();
      break;
  }

  return true;

});

function _makeId() {
  return Date.now();
}

module.exports = EventStore;