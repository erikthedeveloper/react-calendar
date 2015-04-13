var _ = require('lodash');

function EventData(eventData) {
  this._data = eventData;
}

EventData.prototype = {
  eventsForMonth(monthMoment) {
    var e = this._data;
    var m = monthMoment;
    return (e[m.year()] && e[m.year()][m.month()])
      ? e[m.year()][m.month()]
      : [];
  },

  eventsForDay(dayMoment) {
    var e = this._data;
    var m = dayMoment;
    return (e[m.year()] && e[m.year()][m.month()] && e[m.year()][m.month()][m.date()])
      ? e[m.year()][m.month()][m.date()]
      : [];
  },

  add(eventData, date) {},
  remove(eventData) {},
  update(eventData, updateData) {},
  reschedule(eventData, newDate) {}
};

module.exports = EventData;