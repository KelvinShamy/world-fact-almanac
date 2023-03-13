import React, { useState, useEffect } from 'react';
import CountryDisplay from './CountryDisplay';
import CountrySelector from './CountrySelector';


const CountryContainer = () => {
    const [currCountry, setCurrCountry] = useState(null);
    const [currIsFav, setCurrIsFav] = useState(null);
    const [countryData, setCountryData] = useState(null);
   
    const changeCurrCountry = (newCountry) => {
        setCurrCountry(newCountry);
    };


    const getCountryInfo = (country) => {
        if (country === 'United States') country = 'United States of America';
        fetch(`https://restcountries.com/v2/name/${country}`)
        .then(res => res.json())
        .then((data) => {
            if (JSON.stringify(countryData) != JSON.stringify(data)) {
                setCountryData(data);
            }
        })
    }
 

    useEffect(() => {
        getCountryInfo(currCountry);
    }, [currCountry]);


    return (
        <div  id='country-container'>
            <CountryDisplay countryData={countryData} currCountry={currCountry} currIsFav={currIsFav}/>
            <CountrySelector changeCurrCountry={changeCurrCountry}/>
        </div>
    )
};



export default CountryContainer;