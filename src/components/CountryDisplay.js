import React from 'react';
import { useDispatch } from 'react-redux';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDisplay = ({ currCountry, countryData }) => {
    const dispatch = useDispatch();

    const addToFavs = () => {
        // This should cause a re-render of countrySelector
        // countrySelector needs useSelector()
        // this component needs useDispatch

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${currCountry}`,
                visited: false
            })
        };
        fetch('http://localhost:3505/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    };

    let countryInfo;

    if (currCountry && Array.isArray(countryData)) {
        const [ data ] = countryData

        countryInfo = <div>
                        <div id='country-header'>
                            <h1>{data.name}</h1>
                            <img id='flag' src={data.flag} alt={`Flag of ${data.name}`} />
                        </div>
                        <h2>Region: {data.region} - {data.subregion}</h2>
                        <h3>Capital: {data.capital}</h3>
                        <h3>
                            Borders: {
                                data.borders
                                ? data.borders.map(el => countries.getName(el, 'en')).join(', ')
                                : 'This country borders no others'
                            }
                        </h3>
                        <h3>Most-Spoken/Official Language: {data.languages[0].name}</h3>
                        <h3>Currency: {data.currencies[0].name} ({data.currencies[0].symbol})</h3>
                        <h3>Population: {data.population.toLocaleString()}</h3>
                        <h3>Gini Coefficient: {data.gini || 'Data Unvailable'}</h3>
                        <h3>Demonym: {data.demonym}</h3>
                        <div id="display-favs-div">
                            <button className='big-button' type='button' onClick={addToFavs}>Add to Favorites</button>
                        </div>
                    </div>;
    };

    return (   
        <div id='country-display'>
            {countryInfo || <div><h2>Select a Country from the dropdown menu to the right</h2></div>}
        </div>
    )
};

export default CountryDisplay;
