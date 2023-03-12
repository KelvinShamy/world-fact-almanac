import React, { useState, Component } from 'react';
import CountryDisplay from './CountryDisplay';
import CountrySelector from './CountrySelector';


const CountryContainer = () => {
    const [currCountry, setCurrCountry] = useState(null);
    const [currIsFav, setCurrIsFav] = useState(null);
   
    const changeCurrCountry = (newCountry) => {
        setCurrCountry(newCountry);
    }

    return (
        <div  id='CountryContainer'>
            <CountryDisplay currCountry={currCountry} currIsFav={currIsFav}/>
            <CountrySelector changeCurrCountry={changeCurrCountry}/>
        </div>
    )
}



export default CountryContainer;