import React, {Component} from 'react';

export class Calculator extends Component {
  state = {
    displayValue: '0',
    checkForNewInput: false,
    value: null,
    control: null
  }
  inputDigit(digit) {
    const {displayValue, checkForNewInput} = this.state;
    if (checkForNewInput) {
      this.setState({
        displayValue: String(digit),
        checkForNewInput: false
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      });
    }
  }
  inputDot() {
    const {displayValue, checkForNewInput} = this.state;
    if (checkForNewInput) {
      this.setState({
        displayValue: '.',
        checkForNewInput: false
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        checkForNewInput: false
      });
    }
  }
  inputClear() {
    const {displayValue} = this.state;
    this.setState({
      displayValue: '0'
    });
  }
  toggleSign() {
    const {displayValue} = this.state;
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    });
  }
  mathControl(nextControl) {
    const {displayValue, control, value} = this.state;
    const nextValue = parseFloat(displayValue);
    const calculations = {
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '%': (prevValue) => parseFloat(prevValue / 100),
      'x': (prevValue, nextValue) => prevValue * nextValue,
      '÷': (prevValue, nextValue) => prevValue / nextValue,
      '=': (prevValue, nextValue) => nextValue
    }
    if(value == null) {
      this.setState({
        value: nextValue
      });
    } else if (control) {
      const currentInput = value || 0;
      const calculated = calculations[control](currentInput, nextValue);

      this.setState({
        value: calculated,
        displayValue: String(calculated)
      });
    }
    this.setState({
      checkForNewInput: true,
      control: nextControl
    });
  }
  render() {
    const {displayValue} = this.state;
    return (
      <div>
        <div>{displayValue}</div>
        <button onClick={() => this.inputClear()}>AC</button>
        <button onClick={() => this.inputDigit(0)}>0</button>
        <button onClick={() => this.inputDigit(1)}>1</button>
        <button onClick={() => this.inputDigit(2)}>2</button>
        <button onClick={() => this.inputDigit(3)}>3</button>
        <button onClick={() => this.inputDigit(4)}>4</button>
        <button onClick={() => this.inputDigit(5)}>5</button>
        <button onClick={() => this.inputDigit(6)}>6</button>
        <button onClick={() => this.inputDigit(7)}>7</button>
        <button onClick={() => this.inputDigit(8)}>8</button>
        <button onClick={() => this.inputDigit(9)}>9</button>
        <button onClick={() => this.inputDot()}>.</button>
        <button onClick={() => this.toggleSign()}>±</button>
        <button onClick={() => this.mathControl('+')}>+</button>
        <button onClick={() => this.mathControl('-')}>-</button>
        <button onClick={() => this.mathControl('*')}>*</button>
        <button onClick={() => this.mathControl('÷')}>÷</button>
        <button onClick={() => this.mathControl('%')}>%</button>
        <button onClick={() => this.mathControl('=')}>=</button>
      </div>
    );
  }
}
