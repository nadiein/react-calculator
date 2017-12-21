import React from 'react';

function Button({button}) {
  return (
    <button>{button.key}</button>
  );
}

Button.propTypes = {
  button: React.PropTypes.object.isRequired
};

export default Button;
