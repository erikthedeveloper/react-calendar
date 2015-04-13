var _ = require('lodash');

function EventData(eventData) {
  this._data = eventData;
  this._subscriptions = [];
}

EventData.prototype = {

  allEvents() {
    return this._data;
  },

  eventsForMonth(monthMoment) {
    var e = this._data;
    var m = monthMoment;
    return (e[m.year()] && e[m.year()][m.month()])
      ? e[m.year()][m.month()]
      : [];
  },

  eventsForDay(dayMoment) {
    var d = this._data;
    var m = dayMoment;
    return (d[m.year()] && d[m.year()][m.month()] && d[m.year()][m.month()][m.date()])
      ? d[m.year()][m.month()][m.date()]
      : [];
  },

  addEvent(eventData, dateMoment) {
    var d = this._data;
    var m = dateMoment;
    eventData.moment = dateMoment;

    if (!d[m.year()]) d[m.year()] = {};
    if (!d[m.year()][m.month()]) d[m.year()][m.month()] = {};
    if (!d[m.year()][m.month()][m.date()]) d[m.year()][m.month()][m.date()] = [];

    d[m.year()][m.month()][m.date()].push(eventData);
    this.handleSubscriptions();
  },

  removeEvent(eventData) {
    var d = this._data;
    var m = eventData.moment;
    if (d[m.year()] && d[m.year()][m.month()] && d[m.year()][m.month()][m.date()]) {
      var dayData = d[m.year()][m.month()][m.date()];
      dayData
        .forEach((event, index) => {
          if (event.title === eventData.title)
            delete dayData[index];
        });
    }

    this.handleSubscriptions();
  },

  updateEvent(eventData, updateData) {},
  rescheduleEvent(eventData, newDateMoment) {},

  addSubscription(fn) {
    this._subscriptions.push(fn);
  },
  handleSubscriptions() {
    this._subscriptions.forEach((fn) => fn());
  }
};

module.exports = EventData;