import React, { Component } from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


class CountryDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // IS THE NEXT LINE WONKY AS SHIT ?
            // currCountry: this.props.currCountry,
            countryData: null,
            // add currVisited with val of Boolean  ??
            currVisited: false
        }
        this.addToFavs = this.addToFavs.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }


    addToFavs() {
        const visited = this.state.currVisited
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${this.props.currCountry}`,
                visited: visited
            })
        };
        fetch('http://localhost:3505/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))

            // this.setState({ currVisited: false });
    }


    getCountryInfo(where) {
        if (where === 'United States') where = 'United States of America';
        fetch(`https://restcountries.com/v2/name/${where}`)
        .then(res => res.json())
        .then((data) => {
            // console.log('all the data from the API call:', data);
            if (JSON.stringify(this.state.countryData) != JSON.stringify(data)) {
                this.setState({countryData: data});
            }
        })
    }
 

    handleCheck() {
        // function to call when checkbox is clicked
        this.setState( { currVisited: !this.state.currVisited } )
        console.log('this.state: ', this.state);
    };


    componentDidUpdate() {
        this.getCountryInfo(this.props.currCountry);
      }




    render() {
        let countryInfo;
        // THE FIRST TIME THE PAGE TRIES TO RENDER this.state.countryData is still null
        // so 2nd half of this conditional is necessary
        if (this.props.currCountry && Array.isArray(this.state.countryData)) {
            const [ data ] = this.state.countryData
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

            countryInfo = <div className='countryInfo'>
                            <h1>{data.name}</h1>
                            <img id='flag' src={data.flag} alt="`Flag of ${data.name}`" />
                            <h2>Region: {data.region} - {data.subregion}</h2>
                            <h3>Capital: {data.capital}</h3>
                            <h3>Borders: {borders}</h3>
                            <h3>Most-Spoken/Official Language: {data.languages[0].name}</h3>
                            <h3>Currency: {data.currencies[0].name} ({data.currencies[0].symbol})</h3>
                            <h3>Population: {data.population.toLocaleString()}</h3>
                            <h3>Gini Coefficient: {gini}</h3>
                            <h3>Demonym: {data.demonym}</h3>
                            <div id="favsDiv">
                                <button id='addToFavsButton' type='button' onClick={this.addToFavs}>Add to Favorites</button>
                                &nbsp;
                                <label>
                                    I've been here!
                                    <input 
                                        type="checkbox"
                                        onChange={this.handleCheck} 
                                    />
                                    {/* ADD FUNC TO "checkbox" TO setState OF this.state.currVisited TO true */}
                                </label>
                            </div>
                        </div>;

            // ADD IN A CHECKMARK FIELD BEFORE BUTTON

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
