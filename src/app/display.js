import React, {Component} from 'react';

export class Display extends Component {
  state = {
    displayValue: '0'
  }
  inputDigit(digit) {
    const {displayValue} = this.state;
    this.setState({
      displayValue: String(digit)
    });
  }
  render() {
    const {displayValue} = this.state;
    return (
      <div>{displayValue}</div>
    );
  }
}
