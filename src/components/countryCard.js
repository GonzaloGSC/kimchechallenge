import React from 'react';
import Title from '../components/title'
import './styles/countryCard.scss';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

/* 
    Decidí utilizar imágenes para los iconos de banderas de cada país en vez del emoiji proporcionado, 
    esto se debe a que, no todas las plataformas existentes pueden visualizar ciertos iconos en UTF-8 Unicode, 
    a un servidor le ocurrió que al utilizar Windows no pudo visualizar ninguna bandera, así que la solución 
    más apropiada a mi parecer, es utilizar imágenes.

    fuentes:
    https://stackoverflow.com/questions/54519758/flag-emojis-not-rendering
    https://answers.microsoft.com/en-us/windows/forum/all/flag-emoji/85b163bc-786a-4918-9042-763ccf4b6c05?page=1

*/


function CountryCard(props) {
    if (props.array.length > 0 || !props.mNoFound) {
        // console.log(props.array);
        return props.array?.map((el1, i) =>
            <div key={i}>
                <Title texto={el1.name} />
                <div className="row">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} >
                        <Masonry>
                            {
                                el1.countries.map((el2, j) =>
                                    <div className="col" key={j}>
                                        <h1 className="tituloP">{el2.name}&nbsp;<img src={`https://flagcdn.com/24x18/${el2.code.toLowerCase()}.png`} alt="imagen de bandera" /></h1> {/* Notar como utilizo el codigo del pais para generar la imagen */}
                                        <div className="rowTexto">
                                            <p className="txt1">Code:&nbsp;</p>
                                            <p className="txt2">{el2.code}&nbsp;&nbsp;</p>
                                            <p className="txt1">Native:&nbsp;</p>
                                            <p className="txt2">{el2.native}&nbsp;&nbsp;</p>
                                            <p className="txt1">Phone:&nbsp;</p>
                                            <p className="txt2">{el2.phone}&nbsp;&nbsp;</p>
                                            <p className="txt1">Continent:&nbsp;</p>
                                            <p className="txt2">{el2.continent.name}{" ("}{el2.continent.code}{")"}&nbsp;&nbsp;</p>
                                            <p className="txt1">Capital:&nbsp;</p>
                                            <p className="txt2">{el2.capital}&nbsp;&nbsp;</p>
                                            <p className="txt1">Currency:&nbsp;</p>
                                            <p className="txt2">{el2.currency}&nbsp;&nbsp;</p>
                                            <p className="txt1">Languages:&nbsp;</p>
                                            {
                                                el2.languages?.map((el3, k) =>
                                                    <p className="txt2" key={k}>{el3.name},&nbsp;</p>
                                                )
                                            }
                                            <p className="txt2">&nbsp;&nbsp;</p>
                                            <p className="txt1">States:&nbsp;</p>
                                            {
                                                el2.states?.map((el3, k) =>
                                                    <p className="txt2" key={k}>{el3.name}{" ("}{el3.code}{")"},&nbsp;</p>
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
    } else {
        return (
            <h1 className="tituloP">No results found</h1>
        );
    }
}

export default CountryCard;



