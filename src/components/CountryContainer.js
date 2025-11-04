import React, { useState, useEffect } from 'react';
import CountryDisplay from './CountryDisplay';
import CountrySelector from './CountrySelector';

const PORT = 3505;
const BASE_URL = `http://localhost:${PORT}`;
const FAVORITES_URL = `${BASE_URL}/favorites`;

const CountryContainer = () => {
    const [currCountry, setCurrCountry] = useState('Afghanistan');
    // TODO: It would be cool to make currCountry start as a random country
    const [countryData, setCountryData] = useState(null);
    const [favsList, setFavsList] = useState([]);
    
    const headers = {'Content-Type': 'application/json'};
   
    const changeCurrCountry = (country) => setCurrCountry(country);

    const fetchCountryInfo = async (country) => {
        if (country === 'United States') country = 'United States of America';
        try {
            const res = await fetch(`https://restcountries.com/v2/name/${country}`);
            const message = `fetchCountryInfo: HTTP ${res.status}`;
            const data = await res.json();
            setCountryData(data);
            console.log(message);
        } catch(err) {
            console.error(err);
        }
    };

    const fetchFavorites = async () => {
        const getRequestOptions = {
            method: 'GET',
            headers
        };
        try {
            const res = await fetch(FAVORITES_URL, getRequestOptions);
            const message = `fetchFavorites: HTTP ${res.status}`;
            if (!res.ok) throw new Error(message);
            // DYK: The use of throw immediately moves the thread of execution to the catch block
            const data = await res.json();
            console.log('Setting favorites:', data);
            setFavsList(data);
            console.log('message:', message);
        } catch (err) {
            console.error(err);
        }
    };

    const addToFavs = async () => {
        const postOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify({
                country: currCountry,
                visited: false
            })
        };
        try {
            const res = await fetch(BASE_URL, postOptions);
            const message = `addToFavs: HTTP ${res.status}`;
            if (!res.ok) throw new Error(message);
            const data = await res.json();
            console.log(message, data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteFavorite = async (country) => {
        const deleteOptions = {
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                country
            })
        };
        try {
            const res = await fetch(FAVORITES_URL, deleteOptions);
            const message = `deleteFavorite: HTTP ${res.status}`;
            if (!res.ok) throw new Error(message);
            // fetchFavorites();
            console.log(message);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleVisited = async (country) => {
        const putOptions = {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                country
            })
        };
        try {
            const res = await fetch(FAVORITES_URL, putOptions);
            const message = `toggleVisited: HTTP ${res.status}`;
            if (!res.ok) throw new Error(message);
            console.log(message);
            // fetchFavorites();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);
 
    useEffect(() => {
        fetchCountryInfo(currCountry);
    }, [currCountry]);

    return (
        <div id="country-container">
            <CountryDisplay
                countryData={countryData}
                currCountry={currCountry}
                addToFavs={addToFavs}
            />
            <CountrySelector
                favsList={favsList}
                changeCurrCountry={changeCurrCountry}
                fetchFavorites={fetchFavorites}
                deleteFavorite={deleteFavorite}
                toggleVisited={toggleVisited}
            />
        </div>
    )
};

export default CountryContainer;
