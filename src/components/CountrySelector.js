import React, { useState } from 'react';
import defaultCountries from 'i18n-iso-countries/langs/en.json';
import { HiCheckCircle } from 'react-icons/hi';
// const dotenv = require('dotenv').config();
// // import dotenv from 'dotenv';
// dotenv.config();
// const PORT = process.env.PORT;
const PORT = 3505;

const CountrySelector = (props) => {
    const [favsList, setFavsList] = useState([]);

    const getFavs = () => {
        const getRequestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:${PORT}/favorites`, getRequestOptions)
            .then((res) => res.json())
            .then((data) => {
                setFavsList(data);
            })
    };

    const handleDelete = (e) => {
        const { id } = e.target;
        const deleteRequestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch(`http://localhost:${PORT}/favorites`, deleteRequestOptions)
            .then((res) => res.json())
            .then((data) => {
            })
            getFavs();
    };

    const handleVisitUnvisit = (e) => {
        const { id } = e.target;
        const putRequestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch(`http://localhost:${PORT}/favorites`, putRequestOptions)
            .then((res) => res.json())
            .then((data) => {
            })
            getFavs();
    };
    
    const dropCountries = [];
    let country;
    let idCount = 0;

    // exclude mismatches between i18n-iso-countries library and REST countries API BELOW
    const countriesToExclude = ["Antarctica", "Czechia", "Micronesia, Federated States of", "Moldova, Rebublic of"];

    for (const key in defaultCountries.countries) {
        if (Array.isArray(defaultCountries.countries[key])) {
                country = defaultCountries.countries[key][1];
            } else {
                country = defaultCountries.countries[key];
            };
            if(!countriesToExclude.includes(country)) {
                idCount += 1;
                dropCountries.push(
                    <option key={`dropCountry${idCount}`} value={country}>{country}</option>
                    );
                }   
            };

        const favorites = [];

        if (favsList.length) {
            favsList.forEach((el) => {
                // Refactor with boolean && to recognize either first false statement or last true one

                let greenMark = "";
                if (el.visited === true) {
                    greenMark = <HiCheckCircle size={16} className='reactIcon' /> 
                }
                favorites.push(
                    <div key={el._id.toString()}>
                        <button 
                            type="button" 
                            id={el.country}
                            className="favsButton" 
                            onClick={(e) => {handleVisitUnvisit(e)}}
                        >
                            Visit/Unvisit
                        </button>
                        &nbsp;
                        <button 
                            type="button" 
                            id={el.country}
                            className="favsButton" 
                            onClick={(e) => {handleDelete(e)}}
                        >
                            Delete
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        {el.country}
                        {greenMark}
                    </div>
                )
            })
        } else {
            favorites.push(<h3 key={"addFavoritesText"}>Add some Favorites to get started!</h3>)
        };

    return (
        <div id='country-selector'>
                <h1>Select A Country</h1>
                <select id='dropdown' onChange={(e) => {
                    // show country info in CountryDisplay...
                    props.changeCurrCountry(e.target.value)
                }}>
                    {dropCountries}
                </select>
                <div id='favs-button-div'>
                    <button type='button' className='big-button' onClick={getFavs}>
                    View Favorites
                    </button>
                </div>
                <div id='favs-in-selector'>
                    {favorites}
                </div>
            </div>
        )
}

export default CountrySelector;
