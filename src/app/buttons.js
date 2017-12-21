import React, {Component} from 'react';
import axios from 'axios';

import Button from './button';

export class Buttons extends Component {
  constructor() {
    super();
    this.state = {buttons: []};
  }

  componentDidMount() {
    axios
      .get('app/data/buttons.json')
      .then(response => {
        this.setState({buttons: response.data});
      });
  }

  render() {
    return (
      <ul>
        {this.state.buttons.map((button, i) => (
          <Button key={i} button={button}/>
        ))}
      </ul>
    );
  }
}
