var React  = require('react');
var _      = require('lodash');
var moment = require('moment');

var styles = {
  gridBlock: {
    height: 150,
    width: 150,
    float: 'left',
    border: '1px solid gray',
    position: 'relative'
  },
  date: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10
  }
};

var GridDay = React.createClass({

  render: function() {

    var _moment = this.props.curMoment;
    var _styles = _.assign({}, styles.gridBlock);
    if (_moment.day() === 0)
      _styles.clear = 'left';

    return (
      <div style={_styles}>
        <span style={styles.date}>{_moment.format('Do')}</span>
        <ul className="list-unstyled" style={{marginTop: 30, marginLeft: 10}}>
        {this.props.events.map(function (event) { return <li className="label label-info" style={{display: 'inline-block'}}>{event.title}</li>; })}
        </ul>
      </div>
    )
  }

});

var GridDayDummy = React.createClass({
  render: function () {
    return (
      <div style={styles.gridBlock}>
      </div>
    )
  }
});

module.exports = GridDay;
module.exports.GridDayDummy = GridDayDummy;