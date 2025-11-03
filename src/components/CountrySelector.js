import React, { useState, useMemo } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import defaultCountries from 'i18n-iso-countries/langs/en.json';

const PORT = 3505;
const FAVORITES_URL = `http://localhost:${PORT}/favorites`;

const CountrySelector = ({ changeCurrCountry }) => {    
    const [favsList, setFavsList] = useState([]);
    // TODO: Pass down favsList from parent, in order for CountryDisplay to know when it changes?
    
    const headers = {'Content-Type': 'application/json'};

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
            setFavsList(data);
            console.log('message:', message);
        } catch (err) {
            console.error(err);
        }
    };

    // TODO: Add useEffect to load favs automatically?
    // Also to memoize favs?

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
            fetchFavorites();
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
            fetchFavorites();
        } catch (err) {
            console.error(err);
        }
    };

    const EXCLUDE = ["Czechia", "Micronesia, Federated States of", "Moldova, Rebublic of"];
    // TODO: "India" is coming up as British Indian Ocean Territory...

    const countryOptions = useMemo(() => {
        const names = Object.values(defaultCountries.countries).map((value) =>
            Array.isArray(value) ? value[1] : value
        );
        return names.filter((name) => name && !EXCLUDE.includes(name));
    }, []);
    // ^^ Better handle on the server side?

    return (
        <div id="country-selector">
            <h1>Select A Country</h1>
            <select onChange={(e) => changeCurrCountry(e.target.value)}>
                {countryOptions.map((name, i) => (
                    <option key={name+i} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <div className="favs-button-div">
                <button type="button" onClick={fetchFavorites}>
                    Refresh Favorites
                </button>
            </div>
            <div className="favs-in-selector">
                {
                    favsList.length
                        ? favsList.map(({ _id, country, visited }) => {
                            return (
                                <div key={_id.toString()} className="favs-list-item">
                                    <div className="favs-list-item-buttons">
                                        <button 
                                            className="favs-button"
                                            type="button" 
                                            onClick={() => toggleVisited(country)}
                                        >
                                            {visited ? "Unvisit" : "Visit"}
                                        </button>
                                        <button 
                                            className="favs-button"
                                            type="button" 
                                            onClick={() => deleteFavorite(country)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div>
                                        {country}
                                        {visited && <HiCheckCircle size={12} className="react-icon" />}
                                    </div>
                                </div>
                            )})
                        : <h3 key={"addFavoritesText"}>Add some Favorites to get started!</h3>
                }
            </div>
        </div>
    )
};

export default CountrySelector;
