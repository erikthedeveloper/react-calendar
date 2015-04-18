var _            = require('lodash');
var EventEmitter = require('events').EventEmitter;

/**
 * @extends EventEmitter.prototype
 */
var CHANGE_EVENT = 'CHANGE_EVENT';
var ChangeEmitter = _.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

module.exports = ChangeEmitter;