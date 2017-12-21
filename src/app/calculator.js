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
        <div>
          {displayValue}
        </div>
        <button onClick={() => this.inputDigit(11)}>11</button>
        <Buttons onClick={() => this.inputDigit(1)}/>
        <Controls/>
      </div>
    );
  }
}
