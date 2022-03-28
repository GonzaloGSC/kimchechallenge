import React from 'react';
import './styles/searchCard.scss';
import Button from "./button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchCard(props) {


    



    return (
        <div className="contenedor1">
            <div className="card">
                <h1>Country Search</h1>
                <div className="contenedor2">
                    <div className="contenedor3">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <label className="input">
                        <input className="input__field" type="text" placeholder=" " onChange={props.search} value={props.value1} id="iptSearch" />
                        <span className="input__label">Search</span>
                    </label>
                    <div className="contenedor3">
                        <Button classN="btn1" texto="Enter" myClick={props.myClick1} id="btnSearch" />
                    </div>
                </div>
                <h3>Group by:</h3>
                <div className="contenedor4">
                    <div className="contenedor3">
                        <Button classN="btn1" texto="Language" myClick={props.myClick2} id="btnLan" />
                    </div>
                    <div className="contenedor3">
                        <Button classN="btnDis" texto="Continent" myClick={props.myClick3} id="btnCon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;


