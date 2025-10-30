import React from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDisplay = ({ currCountry, countryData }) => {

    const addToFavs = async () => {
        const payload = {
            country: `${currCountry}`,
            visited: false
        };
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        };
        try {
            const res = await fetch('http://localhost:3505/', requestOptions);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            console.log('Successfully added to favorites:', data);
        } catch (err) {
            console.error('Failed to add favorite:', err);
        }
    };

    if (!currCountry || !Array.isArray(countryData) || countryData.length === 0) {
        return (
            <div id='country-display'>
                <div>
                    <h2>Select a Country from the dropdown menu to the right</h2>
                </div>
            </div>
        );
    };
    
    const [ data ] = countryData;

    const {
        name,
        flag,
        region,
        subregion,
        capital,
        borders,
        languages = [],
        currencies = [],
        population,
        gini,
        demonym,
      } = data;

    return (
        <div id='country-display'>
            <div id='country-header'>
                <h1>{name}</h1>
                <img id='flag' src={flag} alt={`Flag of ${name}`} />
            </div>
            <h2>Region: {region} - {subregion}</h2>
            <h3>Capital: {capital}</h3>
            <h3>
                Borders: {
                    borders
                    ? borders.map(el => countries.getName(el, 'en')).join(', ')
                    : 'This country borders no others'
                }
            </h3>
            <h3>Most-Spoken/Official Language: {languages[0]?.name || 'Data Unavailable'}</h3>
            <h3>
                Currency: {
                    currencies?.[0] 
                    ? `${currencies[0].name} (${currencies[0].symbol})` 
                    : 'Data Unavailable'
                }
            </h3>
            <h3>Population: {population.toLocaleString()}</h3>
            <h3>Gini Coefficient: {gini || 'Data Unavailable'}</h3>
            <h3>Demonym: {demonym}</h3>
            <div id="display-favs-div">
                <button className='big-button' type='button' onClick={addToFavs}>Add to Favorites</button>
            </div>
        </div>
    );
};

export default CountryDisplay;
