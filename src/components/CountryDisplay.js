import React, { useState } from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDisplay = (props) => {

    const addToFavs = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${props.currCountry}`,
                visited: false
            })
        };
        fetch('http://localhost:3505/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }


    let countryInfo;
    // THE FIRST TIME THE PAGE TRIES TO RENDER props.countryData is still null
    // so 2nd half of this conditional is a temporary workaround
    if (props.currCountry && Array.isArray(props.countryData)) {
        const [ data ] = props.countryData
        console.log('all data: ', data);

        let borders;
        if (data.borders) {
            // RETRIEVE FULL COUNTRY NAME FROM 3 LETTER CODE WITH:
            // countries.getName("USA", "en"));
            borders = data.borders.map(el => countries.getName(el, 'en')).join(', ')
        } else borders = 'This country borders no others';

        countryInfo = <div>
                        <div id='country-header'>
                            <h1>{data.name}</h1>
                            <img id='flag' src={data.flag} alt="`Flag of ${data.name}`" />
                        </div>
                        <h2>Region: {data.region} - {data.subregion}</h2>
                        <h3>Capital: {data.capital}</h3>
                        <h3>Borders: {borders}</h3>
                        <h3>Most-Spoken/Official Language: {data.languages[0].name}</h3>
                        <h3>Currency: {data.currencies[0].name} ({data.currencies[0].symbol})</h3>
                        <h3>Population: {data.population.toLocaleString()}</h3>
                        <h3>Gini Coefficient: {data.gini || 'Data Unvailable'}</h3>
                        <h3>Demonym: {data.demonym}</h3>
                        <div id="display-favs-div">
                            <button className='big-button' type='button' onClick={addToFavs}>Add to Favorites</button>
                        </div>
                    </div>;
        } else countryInfo = <div>
                <h2>Select a Country from the dropdown menu to the right</h2>
            </div>;

    return (   
        <div id='country-display'>
            {countryInfo}
        </div>
    )
}


export default CountryDisplay;
