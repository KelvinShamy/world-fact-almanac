import React, { useState, useEffect } from 'react';
import CountryDisplay from './CountryDisplay';
import CountrySelector from './CountrySelector';

const CountryContainer = () => {
    const [currCountry, setCurrCountry] = useState('Afghanistan');
    // TODO: It would be cool to make currCountry start as a random country
    const [countryData, setCountryData] = useState(null);
   
    const changeCurrCountry = (newCountry) => {
        setCurrCountry(newCountry);
    };

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
 
    useEffect(() => {
        fetchCountryInfo(currCountry);
    }, [currCountry]);

    return (
        <div id="country-container">
            <CountryDisplay countryData={countryData} currCountry={currCountry} />
            <CountrySelector changeCurrCountry={changeCurrCountry}/>
        </div>
    )
};

export default CountryContainer;
