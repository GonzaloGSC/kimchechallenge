import React from "react";
import "./App.css";
import SearchCard from "../components/searchCard"
import CountryCard from "../components/countryCard"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/",
    cache: new InMemoryCache(),
});

const qallCountries = gql`
  query allCountries {
    countries
    {
        code
        name
        native
        phone
        continent {
            code
            name
        }
        capital
        currency
        languages  {
            code
            name
            native
            rtl
        }
        emoji
        emojiU
        states {
            code
            name
        }
    }
  }
`;

const qallLanguages = gql`
  query allLanguages {
    languages
    {
        code
        name
    }
  } 
`;

const qallContinents = gql`
  query allContinents {
    continents
    {
        code
        name
    }
  }
`;

let loading = false;
let loadingCola = [];
let countries = [];
let continents = [];
let languages = [];
let arregloPorLenguaje = [];
let arregloPorContinente = [];



function IniciarCarga() {
    loading = true
    loadingCola.push("carga");
}

function DetenerCarga() {
    if (loadingCola.length > 0) {
        loadingCola.pop();
        if (loadingCola.length === 0) {
            loading = false;
        }
    } else {
        loading = false;
    }
}

async function QallCountries() {
    IniciarCarga();
    await client.query({ query: qallCountries }).then(response => {
        countries = response.data.countries;
        // console.log(countries);
        DetenerCarga();
        PrepararDatos();
    });
}

async function QallLanguages() {
    IniciarCarga();
    await client.query({ query: qallLanguages }).then(response => {
        languages = response.data.languages;
        // console.log(languages);
        DetenerCarga();
        PrepararDatos();
    });
}

async function QallContinents() {
    IniciarCarga();
    await client.query({ query: qallContinents }).then(response => {
        continents = response.data.continents;
        // console.log(continents);
        DetenerCarga();
        PrepararDatos();
    });
}

function PrepararDatos() {
    let temp = [];
    let dicc = {};
    if (!loading) {
        IniciarCarga();
        for (let i = 0; i < languages.length; i++) {
            temp = countries.filter(function (a) { return a.languages.filter(function (b) { return b.code === languages[i].code; }).length > 0 });

            if (temp.length > 0) {
                dicc = Object.assign({}, languages[i]);
                dicc.countries = temp;
                arregloPorLenguaje.push(dicc);
            }
        }
        for (let i = 0; i < continents.length; i++) {
            temp = countries.filter(function (a) { return a.continent.code === continents[i].code; });

            if (temp.length > 0) {
                dicc = Object.assign({}, continents[i]);
                dicc.countries = temp;
                arregloPorContinente.push(dicc);
            }
        }
        DetenerCarga();
    }
}

QallCountries();
QallLanguages();
QallContinents();

const App = () => {
    let [list, setList] = React.useState([]);
    let [search, setSearch] = React.useState("");
    let [agrupar, setAgrupar] = React.useState(0);
    let [mostrarNoFound, setMostrar] = React.useState(false);

    function handleClick() {
        let arreglo = [];
        let arregloCopiaLen = [];
        let arregloCopiaCon = [];
        let dicc = {}
        setMostrar(true);

        // El siguiente código realiza un filtrado de los arreglos de datos en base al lenguaje/continente (salida -> arreglo)
        if (agrupar === 0) {
            for (let i = 0; i < arregloPorLenguaje.length; i++) {
                dicc = Object.assign({}, arregloPorLenguaje[i]);
                arregloCopiaLen.push(dicc);
            }
            arreglo = arregloCopiaLen.filter(function (a) {
                return a.name?.toLowerCase().includes(search?.toLowerCase()) || a.countries.filter(function (b) { // notar que filtra por nombre de continente/lenguaje O datos dentro del diccionario país
                    return b.name?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.capital?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.native?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.currency?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.code?.toLowerCase().includes(search?.toLowerCase())
                }).length > 0;
            });
        }
        if (agrupar === 1) {
            for (let i = 0; i < arregloPorContinente.length; i++) {
                dicc = Object.assign({}, arregloPorContinente[i]);
                arregloCopiaCon.push(dicc);
            }
            arreglo = arregloPorContinente.filter(function (a) {
                return a.name?.toLowerCase().includes(search?.toLowerCase()) || a.countries.filter(function (b) {  // notar que filtra por nombre de continente/lenguaje O datos dentro del diccionario país
                    return b.name?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.capital?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.native?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.currency?.toLowerCase().includes(search?.toLowerCase()) ||
                        b.code?.toLowerCase().includes(search?.toLowerCase())
                }).length > 0;
            });
        }

        /*  Luego de haber filtrado en base al lenguaje o continente (arreglo), se procede a filtrar arreglos de países dentro de lenguajes o continentes, 
            así si la búsqueda coincide con el nombre de un país y un lenguaje, por ejemplo, no se dejan todos los países de ese lenguaje, y solo los que 
            realmente coinciden con la busqueda. También puede ocurrir, por ejemplo, que si se busca "spa" aparezca España y todos los países del idioma español.
        */
        for (let i = 0; i < arreglo.length; i++) {
            // console.log(arreglo[i].name + " : " + !arreglo[i].name.toLowerCase().includes(search?.toLowerCase()))
            if (!arreglo[i].name.toLowerCase().includes(search?.toLowerCase())) {
                arreglo[i].countries = arreglo[i].countries.filter(function (a) {
                    return a.name?.toLowerCase().includes(search?.toLowerCase()) ||
                        a.capital?.toLowerCase().includes(search?.toLowerCase()) ||
                        a.native?.toLowerCase().includes(search?.toLowerCase()) ||
                        a.currency?.toLowerCase().includes(search?.toLowerCase()) ||
                        a.code?.toLowerCase().includes(search?.toLowerCase())
                })
            }
        }
        // console.log(arreglo)
        setList(arreglo);
    }

    function handleClickAgrLen() {
        setAgrupar(0);
    }

    function handleClickAgrCon() {
        setAgrupar(1);
    }

    React.useEffect(() => {
        let input1 = document.getElementById("iptSearch");
        let button1 = document.getElementById("btnSearch");
        let button2 = document.getElementById("btnLan");
        let button3 = document.getElementById("btnCon");

        input1.addEventListener("keyup", function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                button1.click();
            }
        });

        button2.addEventListener("click", function (event) {
            event.preventDefault();
            button2.className = "btn1";
            button3.className = "btnDis";
        });

        button3.addEventListener("click", function (event) {
            event.preventDefault();
            button2.className = "btnDis";
            button3.className = "btn1";
        });
    }, [])

    return (
        <ApolloProvider client={client}>
            <div>
                <h2>
                    kimche Challenge by Gonzalo Salinas
                    <span role="img" aria-label="Beer">
                        🍺
                    </span>
                </h2>
            </div>
            <SearchCard
                search={e => setSearch(e.target.value)}
                myClick1={handleClick}
                myClick2={handleClickAgrLen}
                myClick3={handleClickAgrCon}
                value1={search}
            />
            <CountryCard array={list} mNoFound={mostrarNoFound} />
        </ApolloProvider>
    );
}

export default App;
