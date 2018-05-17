import React from 'react';

const Button = (props) => {

    return (
        <button className={`btn btn-transparent btn-${props.classNameSize} btn-${props.classNameType}`} onClick={props.action}>{props.type}</button>
    )
}

export default Button;