var React  = require('react');
var _      = require('lodash');
var moment = require('moment');

var UserSelectedActions = require('../actions/UserSelectedActions');

var styles = {
  gridBlock: {
    height: 150,
    width: 100/7 + "%",
    float: 'left',
    border: '1px solid gray',
    position: 'relative',
    overflow: 'scroll',
    cursor: 'pointer'
  },
  date: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10
  },
  label: {
    display:      'inline-block',
    maxWidth:     "100%",
    whiteSpace:   "nowrap",
    overflow:     "hidden",
    textOverflow: "ellipsis",
    cursor: 'pointer'
  }
};

var GridDay = React.createClass({

  propTypes: {
    isActive: React.PropTypes.bool
  },

  render: function() {
    var dayMoment = this.props.curMoment;

    return (
      <div style={this._getStyles()} onClick={this.onClickDay.bind(null, dayMoment)}>
        <span style={styles.date}>{dayMoment.format('Do')}</span>
        <ul className="list-unstyled" style={{marginTop: 30, marginLeft: 10}}>
        {this.props.events.map((event) =>
          <li
            onClick={this.onClickEvent.bind(null, event)}
            className="label label-info"
            style={styles.label}>
            {event.title}
          </li>)}
        </ul>
      </div>
    )
  },

  onClickDay(dayMoment) {
    UserSelectedActions.selectDay(dayMoment);
  },

  onClickEvent(eventData, e) {
    e.stopPropagation();
    UserSelectedActions.selectEvent(eventData.id);
  },

  _getStyles() {
    var _styles = _.assign({}, styles.gridBlock);
    if (this.props.curMoment.day() === 0)
      _styles.clear = 'left';
    if (this.props.isActive)
      _styles.backgroundColor = 'lightgray';
    return _styles;
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