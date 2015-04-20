let React = require('react');

let InputBinder = React.createMixin({
  bindInputValue(propName) {
    return (e) => this.setState({[propName]: e.target.value});
  }
});

module.exports = InputBinder;