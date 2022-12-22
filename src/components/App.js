// these will be 'import' statements (because we are not running in Node)
import React, { Component } from 'react';
// import countries from 'i18n-iso-countries';
import defaultCountries from 'i18n-iso-countries/langs/en.json';
import CountryContainer from './CountryContainer.js'

// console.log(countries.getName("US", "en"));
// console.log(defaultCountries);


// MUST CREATE A SERVER FILE AND ADD "start": "nodemon server/server.js", (<<< replace with location of server file) in order to run the server

// 'country' below will be the value of whatever is selected from the dropdown menu
// store it in state as something like 'state.currCountry'


// async function getCountryInfo(where) {
//     const res = await fetch(`https://restcountries.com/v2/name/${where}`);
//     const data = await res.json();
//     console.log('all the data from the API call:', data[0]);
//     data[0].languages.forEach(el => console.log(el.name));
//     console.log(data[0].currencies);
//     return data;
// };

// getCountryInfo(country);

class App extends Component {
    constructor(props) {
        super(props);
        // BUILD THIS OUT ??
        // this.state = {
        //     // selected: false,
        //     // currCountry: 'Brazil'
        // }
    }

    // create a another component 
    // only renders if a currCountry is truthy
    // calls getCountryInfo ??
    // 


    render() {
        // logic here
        // const countryComponents = countryArr.map(el => {
        //     <ul class='country'>{el}</ul>
        //     console.log('yes');
        // })

        // RENDERS ALL COUNTRY NAMES
        // const countryComponents = [];
        // countryArr.forEach(el => {
        //     countryComponents.push(
        //     <div className='app'>
        //         {el}
        //     </div>);
        // })

        return(
            // what to render here
            <div id='renders CountryContainer'>
                {/* <h2>CHOOSE A COUNTRY</h2>
                {countryComponents}  */}
                <CountryContainer/>
            </div>
        )
    }
}

export default App;