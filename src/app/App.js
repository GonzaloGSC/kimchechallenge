import {useCallback} from "react";
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

export function IniciarBusqueda() {
    if (!loading) {
        console.log("TEST")
    }
    console.log("TEST")
}

QallCountries();
QallLanguages();
QallContinents();

const App = () => {
    let [list, setList] = React.useState(arregloPorLenguaje);
    let [search, setSearch] = React.useState("");

    function handleClick() {
        setList(arregloPorLenguaje);
    }

    function searchType(event) {
        setSearch(event.target.value);
        console.log(search);
    }   

    const _handleChange = useCallback(value => setSearch(value), [setSearch])
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
            <SearchCard search={_handleChange} myClick1={handleClick} value1={search}/>
            <CountryCard array={list} />
        </ApolloProvider>
    );
}

export default App;
