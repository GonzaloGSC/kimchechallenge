import React from 'react';
import Title from '../components/title'
import './styles/countryCard.scss';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"



function CountryCard(props) {
    return (
        props.array.map(el1 =>  
            <div>
                <Title texto={el1.name} />
                <div class="row">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 } } >
                        <Masonry>
                            {
                                el1.countries.map(el2 =>
                                    <div class="col">
                                        <h1 class="tituloP">{el2.name}</h1>
                                        <div class="rowTexto">
                                            <p class="txt1">Code:&nbsp;</p>
                                            <p class="txt2">{el2.code}&nbsp;&nbsp;</p>
                                            <p class="txt1">Native:&nbsp;</p>
                                            <p class="txt2">{el2.native}&nbsp;&nbsp;</p>
                                            <p class="txt1">Phone:&nbsp;</p>
                                            <p class="txt2">{el2.phone}&nbsp;&nbsp;</p>
                                            <p class="txt1">Continent:&nbsp;</p>
                                            <p class="txt2">{el2.continent.name}{" ("}{el2.continent.code}{")"}&nbsp;&nbsp;</p>
                                            <p class="txt1">Capital:&nbsp;</p>
                                            <p class="txt2">{el2.capital}&nbsp;&nbsp;</p>
                                            <p class="txt1">Currency:&nbsp;</p>
                                            <p class="txt2">{el2.currency}&nbsp;&nbsp;</p>
                                            <p class="txt1">Languages:&nbsp;</p>
                                            {
                                                el2.languages?.map(el3 =>
                                                    <p class="txt2">{el3.name},&nbsp;</p>
                                                )
                                            }
                                            <p class="txt2">&nbsp;&nbsp;</p>
                                            <p class="txt1">States:&nbsp;</p>
                                            {
                                                el2.states?.map(el3 =>
                                                    <p class="txt2">{el3.name}{" ("}{el3.code}{")"},&nbsp;</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
        )
    );
}

export default CountryCard;



