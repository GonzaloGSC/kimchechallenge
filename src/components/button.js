import React from 'react';
import './styles/button.scss';
import IniciarBusqueda from '../app/App'

function Button(props) {
    function RealizarBusqueda(){
        IniciarBusqueda();
        console.log("funciona en boton")
    }
    return (
        <button class={props.classN} onClick={props.myClick} id={props.id}>
            {props.texto}
        </button>
    );
}

export default Button;