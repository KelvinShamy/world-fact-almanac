import React from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDisplay = ({ currCountry, countryData, addToFavs }) => {
    if (!currCountry || !Array.isArray(countryData) || countryData.length === 0) {
        return (
            <div id="country-display">
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

    const NA = 'Data Unavailable';

    return (
        <div id="country-display">
            <div className="country-header">
                <h1>{name}</h1>
                <img className="flag" src={flag} alt={`Flag of ${name}`} />
            </div>
            <h2>Region: {region} - {subregion}</h2>
            <h3>Capital: {capital || NA}</h3>
            <h3>
                Borders: {
                    borders
                    ? borders.map(el => countries.getName(el, 'en')).join(', ')
                    : 'This country borders no others'
                }
            </h3>
            <h3>Most-Spoken/Official Language: {languages[0]?.name || NA }</h3>
            <h3>
                Currency: {
                    currencies?.[0] 
                    ? `${currencies[0].name} (${currencies[0].symbol})` 
                    : NA
                }
            </h3>
            <h3>Population: {population.toLocaleString()}</h3>
            <h3>Gini Coefficient: {gini || NA}</h3>
            {/* TODO: Add tooltip explaining what gini coefficient is */}
            <h3>Demonym: {demonym || NA}</h3>
            <div className="add-fav-div">
                <button className="big-button" type="button" onClick={addToFavs}>Add to Favorites</button>
            </div>
        </div>
    );
};

export default CountryDisplay;
