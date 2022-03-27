import React from 'react';
import './styles/button.scss';

function Button(props) {
    return (
        <button className={props.classN} onClick={props.myClick} id={props.id}>
            {props.texto}
        </button>
    );
}

export default Button;