import React, {Component} from 'react';
import axios from 'axios';

import Control from './control';

export class Controls extends Component {
  constructor() {
    super();
    this.state = {controls: []};
  }

  componentDidMount() {
    axios
      .get('app/data/controls.json')
      .then(response => {
        this.setState({controls: response.data});
      });
  }

  render() {
    return (
      <ul>
        {this.state.controls.map((control, i) => (
          <Control key={i} control={control}/>
        ))}
      </ul>
    );
  }
}
