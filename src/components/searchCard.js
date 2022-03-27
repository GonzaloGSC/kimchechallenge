import React from 'react';
import './styles/searchCard.scss';
import Button from "./button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchCard(props) {
    return (
        <div class="contenedor1">
            <div class="card">
                <h1>Country Search</h1>
                <div class="contenedor2">
                    <div class="contenedor3">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <label class="input">
                        <input class="input__field" type="text" placeholder=" " onChange={props.search} value={props.value1}/>
                        <span class="input__label">Search</span>
                    </label>
                    <div class="contenedor3">
                        <Button texto="Enter" myClick1={props.myClick1} />
                    </div>
                </div>
                <h3>Group by:</h3>
                <div class="contenedor4">
                    <div class="contenedor3">
                        <Button texto="Continent" />
                    </div>
                    <div class="contenedor3">
                        <Button texto="Language" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;


