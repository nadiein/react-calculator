import React, {Component} from 'react';

export class Display extends Component {
  render() {
    const {value, props} = this.props;
    let displayValue = value;
    const match = value.match(/\.\d*?(0*)$/);
    if (match) {
      displayValue += (/[1-9]/).test(match[0]) ? match[1] : match[0];
    }
    return (
      <div {...props} className="calculator-display">
        {displayValue}
      </div>
    );
  }
}

Display.propTypes = {
  value: React.PropTypes.string.isRequired,
  props: React.PropTypes.object.isRequired
};
