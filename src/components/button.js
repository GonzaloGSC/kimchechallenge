import React from 'react';
import './styles/button.scss';
import IniciarBusqueda from '../app/App'

function Button(props) {
    function RealizarBusqueda(){
        IniciarBusqueda();
        console.log("funciona en boton")
    }
    return (
        <button class="btn1" onClick={props.myClick1}>
            {props.texto}
        </button>
    );
}

export default Button;