import React, {Component} from 'react';
import {Controls} from './controls';
import {Buttons} from './buttons';

export class Calculator extends Component {
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
      <div>
        <Display value={displayValue}/>
        <Buttons/>
        <Controls/>
      </div>
    );
  }
}
