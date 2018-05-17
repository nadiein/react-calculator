import React, {Component} from 'react';
import Button from './button';
import axios from 'axios';

import data from './data';

export class Calculator extends Component {
    state = {
        displayValue: '',
        checkForNewInput: false,
        value: null,
        control: null,
        turnedOn: false,
        items: []
    }

    componentDidMount() {
        axios.get(data)
          .then((response) => {
            console.log(response.data);
            this.setState({
                items: response
            })
          })
          .catch((error) => {
            console.log(error);
          });
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

    inputOn() {
        const {displayValue, turnedOn} = this.state;
        if (!turnedOn) {
            this.setState({
                displayValue: '0', 
                turnedOn: true
            });
        } 

        this.setState({
            displayValue: '',
            turnedOn: false
        });
    }

    displayOff() {
        const {displayValue, turnedOn} = this.state;
        this.setState({
            displayValue: '',
            turnedOn: false
        });
    }

    inputClear() {
        const {displayValue, turnedOn} = this.state;
        if (!turnedOn) {
            this.setState({
                displayValue: '0',
                turnedOn: false
            });
        } else {
            this.setState({
                displayValue: '0',
                turnedOn: true
            });
        }
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

        if (value == null) {
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
        const {displayValue, items} = this.state;
        return (
            <div className="d-flex flex-column calc-cont">
                <div className="calc-display">{displayValue}</div>
                <div className="d-flex flex-row flex-wrap calc-btn-group">
                    <Button classNameSize={'sm'} classNameType={'off'} type={'X'} />
                    {/*<button className="btn btn-transparent btn-xs btn-square" onClick={() => this.mathControl('√')}>√</button>
                    <button className="btn btn-transparent btn-xs btn-off" onClick={() => this.displayOff()}>OFF</button>
                    <button className="btn btn-transparent btn-sm btn-mc">MC</button>
                    <button className="btn btn-transparent btn-sm btn-mr">MR</button>
                    <button className="btn btn-transparent btn-sm btn-m-del">M-</button>
                    <button className="btn btn-transparent btn-sm btn-m-add">M+</button>
                    <button className="btn btn-transparent btn-sm btn-division" onClick={() => this.mathControl('÷')}>÷</button>
                    <button className="btn btn-transparent btn-sm btn-percent" onClick={() => this.mathControl('%')}>%</button>
                    <button className="btn btn-transparent btn-sm btn-7" onClick={() => this.inputDigit(7)}>7</button>
                    <button className="btn btn-transparent btn-sm btn-8" onClick={() => this.inputDigit(8)}>8</button>
                    <button className="btn btn-transparent btn-sm btn-9" onClick={() => this.inputDigit(9)}>9</button>
                    <button className="btn btn-transparent btn-sm btn-multiplication" onClick={() => this.mathControl('x')}>*</button>
                    <button className="btn btn-transparent btn-sm btn-sign-toggle" onClick={() => this.toggleSign()}>±</button>
                    <button className="btn btn-transparent btn-sm btn-4" onClick={() => this.inputDigit(4)}>4</button>
                    <button className="btn btn-transparent btn-sm btn-5" onClick={() => this.inputDigit(5)}>5</button>
                    <button className="btn btn-transparent btn-sm btn-6" onClick={() => this.inputDigit(6)}>6</button>
                    <button className="btn btn-transparent btn-sm btn-subtraction" onClick={() => this.mathControl('-')}>-</button>
                    <button className="btn btn-transparent btn-sm btn-clear" onClick={() => this.inputClear()}>C</button>
                    <button className="btn btn-transparent btn-sm btn-1" onClick={() => this.inputDigit(1)}>1</button>
                    <button className="btn btn-transparent btn-sm btn-2" onClick={() => this.inputDigit(2)}>2</button>
                    <button className="btn btn-transparent btn-sm btn-3" onClick={() => this.inputDigit(3)}>3</button>
                    <button className="btn btn-transparent btn-sm btn-on" onClick={() => this.inputOn()}>AC</button>
                    <button className="btn btn-transparent btn-sm btn-0" onClick={() => this.inputDigit(0)}>0</button>
                    <button className="btn btn-transparent btn-sm btn-point" onClick={() => this.inputDot()}>.</button>
                    <button className="btn btn-transparent btn-sm btn-equal" onClick={() => this.mathControl('=')}>=</button>
                    <button className="btn btn-transparent btn-lg btn-addition" onClick={() => this.mathControl('+')}>+</button>*/}
                </div>
            </div>
        );
    }
}
