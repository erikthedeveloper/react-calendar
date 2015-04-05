var React = require('react');
var moment = require('moment');

var GridMonth = require('./GridMonth');

module.exports = React.createClass({

  render: function () {

    return (
      <div>

        <GridMonth
          initialMomentDate={moment()}
        />
        
      </div>
    )
  }

});