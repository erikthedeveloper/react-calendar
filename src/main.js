var React = require('react');
var moment = require('moment');
var Calendar = require('./Calendar');

var DATA_SOURCE = {
  2015: {
    3: {
      3: [
        {title: 'April 3rd'},
        {title: 'And another... April 3rd'}
      ],
      10: [ {title: 'My Birthday!'}]
    },
    4: {
      5: [{title: 'Sinco De Mayo!'}],
      14: [
        {title: 'Just another day...'},
        {title: 'The 14th!'}
      ]
    }
  }
};

for (var year in DATA_SOURCE)
  for (var monthIndex in DATA_SOURCE[year])
    for (var date in DATA_SOURCE[year][monthIndex])
      for (var eventIndex in DATA_SOURCE[year][monthIndex][date])
        DATA_SOURCE[year][monthIndex][date][eventIndex]['moment'] = moment([year, monthIndex, date]);

React.render(
  <Calendar eventData={DATA_SOURCE}/>,
  document.getElementById('calendar')
);