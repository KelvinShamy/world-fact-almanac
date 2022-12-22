import React, { Component } from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

class CountryDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // IS THE NEXT LINE WONKY AS SHIT ?
            // currCountry: this.props.currCountry,
            countryData: null
        }
        this.addToFavs = this.addToFavs.bind(this);
    }


    addToFavs() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${this.props.currCountry}`
            })
        };
        fetch('http://localhost:3000/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }


    getCountryInfo(where) {
        if (where === 'United States') where = 'United States of America';
        fetch(`https://restcountries.com/v2/name/${where}`)
        .then(res => res.json())
        .then((data) => {
            console.log('all the data from the API call:', data);
            if (JSON.stringify(this.state.countryData) != JSON.stringify(data)) {
                this.setState({countryData: data});
            }
        })
    }
 

    componentDidUpdate() {
        this.getCountryInfo(this.props.currCountry);
    
      }


    render() {
        console.log('CountryDisplay rendered');
        let countryInfo;
        // THE FIRST TIME THE PAGE TRIES TO RENDER this.state.countryData is still null
        // so 2nd half of this conditional is necessary
        if (this.props.currCountry && Array.isArray(this.state.countryData)) {
            const [ data ] = this.state.countryData

            // FORMAT FOR GETTING FULL COUNTRY NAME FROM 3 LETTER CODE BELOW
            // console.log('countries.getName("USA", "en"): ', countries.getName("USA", "en"));

            let borders;
            if (data.borders) {
                borders = data.borders.map(el => countries.getName(el, 'en')).join(', ')
            } 
            else borders = 'This country borders no others'

            countryInfo = <div className='countryInfo'>
                            <h1>{data.name}</h1>
                            <img id='flag' src={data.flag} alt="`Flag of ${data.name}`" />
                            <h2>Region: {data.region} - {data.subregion}</h2>
                            <h3>Borders: {borders}</h3>
                            <h3>Most Spoken Language: {data.languages[0].name}</h3>
                            <h3>Currency: {data.currencies[0].name} ({data.currencies[0].symbol})</h3>
                            <h3>Population: {data.population.toLocaleString()}</h3>
                            <h3>Capital: {data.capital}</h3>
                            <button id='addToFavsButton' type='button' onClick={this.addToFavs}>Add to Favorites</button>
                        </div>;

            } else countryInfo = 
                <div className='countryInfo'>
                    <h2>Select a Country from the dropdown menu to the right</h2>
                </div>;
                // countryInfo.push(<button id='addToFavsButton' type='button' onClick={this.addToFavs}>Add to Favorites</button>);

        return (   
            <div>
                {countryInfo}
            </div>
        )
    }
}


export default CountryDisplay;
