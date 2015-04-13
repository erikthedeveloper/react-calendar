var React  = require('react');
var _      = require('lodash');
var moment = require('moment');

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

  render: function() {

    var _moment = this.props.curMoment;
    var _styles = _.assign({}, styles.gridBlock);
    if (_moment.day() === 0)
      _styles.clear = 'left';

    return (
      <div style={_styles} onClick={this.props.onClick}>
        <span style={styles.date}>{_moment.format('Do')}</span>
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

  propTypes: {
    onClick: React.PropTypes.func
  },

  onClickEvent(eventData, e) {
    e.stopPropagation();
    this.props.onSelectEvent(eventData);
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