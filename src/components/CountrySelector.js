import React, { Component } from 'react';
import defaultCountries from 'i18n-iso-countries/langs/en.json';

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        // THE STATE I SET HERE WILL HAVE TO GET PASSED TO CountryDisplay SOMEHOW
        // (OR SHOULD I BE STORING THE STATE ELSEWHERE?)
        this.state = {
            favs: true,
            favsClicked: false,
            favsList: []
        }
        this.getFavs = this.getFavs.bind(this);
        this.deletor = this.deletor.bind(this);
    }


    getFavs() {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({
            //     country: `${this.props.currCountry}`
            // })
        };
        fetch('http://localhost:3000/favorites', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log('data from GET request for favorites: ', data)
                this.setState({ favsList: data })
                console.log('this.state.favsList: ', this.state.favsList);
            })
    }


    deletor(e) {
        const { id } = e.target;
        console.log(`you would like to delete ${id}`);
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch('http://localhost:3000/favorites', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log('data from DELETE request for favorites: ', data)
                // this.setState({ favsList: data })
                // console.log('this.state.favsList: ', this.state.favsList);
            })
            this.getFavs();

    }

    // IS THIS NECESSARY?
//     componentDidMount() {

// }


render() {
    
    const dropCountries = [];
    // console.log('defaultCountries.countries: ', defaultCountries.countries);
    let country;
    let idCount = 0;

    // SET UP A GIT IGONRE FILE
    // FIND A WAY TO DELETE [ "Antartica", "Micronesia, Federated States of", "Moldova, Rebublic of" ] BELOW ??

    for (const key in defaultCountries.countries) {
        if (Array.isArray(defaultCountries.countries[key])) {
                country = defaultCountries.countries[key][1];
            } else {
                country = defaultCountries.countries[key];
            }   
            idCount += 1;
            dropCountries.push(
                <option key={`dropCountry${idCount}`} value={country}>{country}</option>
                );
            }

            let viewFavs = <div>Explore some countries to add to your favorites!</div>;

            // CONDITIONAL THAT CHECKS IF favs === true, if so
            // if (this.state.favs) {
            //     if (this.state.favsClicked === false) {
            //         this.state.favsClicked === true
            //     }
                // create a button 'view favs' to render to the screen
                viewFavs = [<button 
                type='button' 
                id='favsButton'
                onClick={this.getFavs}>
                    View Favorites
                    </button>]


                const favorites = [

                ];

                if (this.state.favsList.length) {
                    // make get request to db for all favorites
                    this.state.favsList.forEach((el, index) => {
                        favorites.push(
                            <div>
                                <button 
                                    type="button" 
                                    id={el.country}
                                    className="deleteButton" 
                                    onClick={(e) => {
                                        this.deletor(e)
                                        }}>
                                    Delete
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                {el.country}
                            </div>
                        )
                    })
                } else favorites.push(<div>Add some Favorites to get started</div>)
            // }

        
        return (
            <div id='CountrySelector'>
                    <h1>Select A Country</h1>
                    <select id='dropdown' onChange={(e) => {
                        this.props.changeCurrCountry(e.target.value)
                    }}>
                        {dropCountries}
                    </select>
                    {viewFavs}
                    {favorites}
                </div>
            )
              
    }


}


export default CountrySelector