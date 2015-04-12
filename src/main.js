var React = require('react');
var Calendar = require('./Calendar');

var DATA_SOURCE = {
  2015: {
    3: {
      3: [
        {title: 'April 3rd'},
        {title: 'And another... April 3rd'}
      ],
      10: [
        {title: 'My Birthday!'}
      ]
    }
  }
};

React.render(
  <Calendar defaultMonthIndex={1} eventData={DATA_SOURCE}/>,
  document.getElementById('calendar')
);