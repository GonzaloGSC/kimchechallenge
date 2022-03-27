import React from 'react';
import './styles/title.scss';

function Title(props) {
    return (
        <h1>
            {props.texto}
        </h1>
    );
}

export default Title;