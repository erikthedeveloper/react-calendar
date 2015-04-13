var React = require('react');
var _     = require('lodash');

var _styles = {
  cursor: 'pointer'
};

var ArrowButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    direction: React.PropTypes.oneOf(['left', 'right']).isRequired
  },

  render() {
    return (
      <a
        onClick={this.onClick}
        {...this.props}
        style={_.assign(_styles, this.props.style)}>
        <span className={`glyphicon glyphicon-arrow-${this.props.direction}`}></span>
      </a>
    )
  },

  onClick(e) {
    e.preventDefault();
    e.stopPropogation();
    this.props.onClick();
  }
});

module.exports = ArrowButton;