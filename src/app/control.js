import React from 'react';

function Control({control}) {
  return (
    <button>{control.key}</button>
  );
}

Control.propTypes = {
  control: React.PropTypes.object.isRequired
};

export default Control;
