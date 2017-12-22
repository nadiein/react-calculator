import React, {Component} from 'react';

export class Calculator extends Component {
  state = {
    displayValue: '',
    checkForNewInput: false,
    value: null,
    control: null,
    turnedOn: false
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
    const {displayValue, turnedOn} = this.state;
    if (!turnedOn) {
      this.setState({
        displayValue: '0', 
        turnedOn: true
      });
    } else {
      this.setState({
        displayValue: '', 
        turnedOn: false
      });
    }
    this.setState({
      displayValue: '0', 
      turnedOn: true
    });
  }
  displayOff() {
    const {displayValue, turnedOn} = this.state;
    this.setState({
      displayValue: '', 
      turnedOn: false
    });
  }
  toggleSign() {
    const {displayValue, turnedOn} = this.state;
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue,
      turnedOn: true
    });
  }
  mathControl(nextControl) {
    const {displayValue, control, value, turnedOn} = this.state;
    const nextValue = parseFloat(displayValue);
    const calculations = {
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '%': (prevValue) => prevValue / 100,
      'x': (prevValue, nextValue) => prevValue * nextValue,
      '÷': (prevValue, nextValue) => prevValue / nextValue,
      '√': (prevValue) => Math.sqrt(prevValue),
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
      control: nextControl,
      turnedOn: true
    });
  }
  render() {
    const {displayValue} = this.state;
    return (
      <div className="d-flex flex-column calc-cont">
        <div className="calc-display">{displayValue}</div>
        <div className="d-flex flex-row flex-wrap">
          <button className="btn btn-transparent btn-xs" onClick={() => this.mathControl('√')}>√</button>
          <button className="btn btn-transparent btn-xs" onClick={() => this.displayOff()}>OFF</button>
          <button className="btn btn-transparent btn-sm">MC</button>
          <button className="btn btn-transparent btn-sm">MR</button>
          <button className="btn btn-transparent btn-sm">M-</button>
          <button className="btn btn-transparent btn-sm">M+</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.mathControl('÷')}>÷</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.mathControl('%')}>%</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(7)}>7</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(8)}>8</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(9)}>9</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.mathControl('*')}>*</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.toggleSign()}>±</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(4)}>4</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(5)}>5</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(6)}>6</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.mathControl('-')}>-</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.mathControl('-')}>C</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(1)}>1</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(2)}>2</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(3)}>3</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputClear()}>AC</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDigit(0)}>0</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.inputDot()}>.</button>
          <button className="btn btn-transparent btn-sm" onClick={() => this.mathControl('=')}>=</button>
          <button className="btn btn-transparent btn-lg" onClick={() => this.mathControl('+')}>+</button>
        </div>
      </div>
    );
  }
}
