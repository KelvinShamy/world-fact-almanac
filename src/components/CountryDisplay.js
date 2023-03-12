import React, { useState } from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDisplay = (props) => {
    const [currVisited, setCurrVisited] = useState(false);


    const addToFavs = () => {
        const visited = currVisited
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${props.currCountry}`,
                visited: visited
            })
        };
        fetch('http://localhost:3505/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }


    const handleCheck = () => {
        setCurrVisited(!currVisited);
        console.log(`You have marked the current country as visited ${currVisited}`);
    };


    let countryInfo;
    // THE FIRST TIME THE PAGE TRIES TO RENDER props.countryData is still null
    // so 2nd half of this conditional is a temporary workaround
    if (props.currCountry && Array.isArray(props.countryData)) {

        const [ data ] = props.countryData
        console.log('all data: ', data);

        // FORMAT FOR GETTING FULL COUNTRY NAME FROM 3 LETTER CODE BELOW
        // console.log('countries.getName("USA", "en"): ', countries.getName("USA", "en"));
        let borders;
        if (data.borders) {
            borders = data.borders.map(el => countries.getName(el, 'en')).join(', ')
        } 
        else borders = 'This country borders no others'

        let gini;
        if (data.gini === undefined) {
            gini = 'Data unavailable';
        } else gini = data.gini;

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
                        <h3>Gini Coefficient: {gini}</h3>
                        <h3>Demonym: {data.demonym}</h3>
                        <div id="display-favs-div">
                            <button className='big-button' type='button' onClick={addToFavs}>Add to Favorites</button>
                        </div>
                    </div>;

        } else countryInfo = 
            <div>
                <h2>Select a Country from the dropdown menu to the right</h2>
            </div>;

    return (   
        <div className='country-display'>
            {countryInfo}
        </div>
    )
}


export default CountryDisplay;
