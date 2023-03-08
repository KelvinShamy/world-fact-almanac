import React, { Component } from 'react';
import defaultCountries from 'i18n-iso-countries/langs/en.json';
import { HiCheckCircle } from 'react-icons/hi';
// const dotenv = require('dotenv').config();
// // import dotenv from 'dotenv';
// dotenv.config();
// const PORT = process.env.PORT;
const PORT = 3505;

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favs: true,
            favsClicked: false,
            favsList: []
        }
        this.getFavs = this.getFavs.bind(this);
        this.deletor = this.deletor.bind(this);
        this.visitUnvisit = this.visitUnvisit.bind(this);
    }


    getFavs() {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:${PORT}/favorites`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log('data received from getFavs: ', data);
                this.setState({ favsList: data })
            })
    }


    deletor(e) {
        const { id } = e.target;
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch(`http://localhost:${PORT}/favorites`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                // this.setState({ favsList: data })
                // console.log('this.state.favsList: ', this.state.favsList);
            })
            this.getFavs();
    }

    visitUnvisit(e) {
        const { id } = e.target;
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch(`http://localhost:${PORT}/favorites`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                // this.setState({ favsList: data })
                // console.log('this.state.favsList: ', this.state.favsList);
            })
            this.getFavs();
    }




render() {
    
    const dropCountries = [];
    let country;
    let idCount = 0;

    // EXCLUDING MISMATCHES BETWEEN i18n-iso-countries library and REST countries API BELOW
    const countriesToExclude = ["Antarctica", "Czechia", "Micronesia, Federated States of", "Moldova, Rebublic of"];

    for (const key in defaultCountries.countries) {
        if (Array.isArray(defaultCountries.countries[key])) {
                country = defaultCountries.countries[key][1];
            } else {
                country = defaultCountries.countries[key];
                console.log('country: ', country);
            }
            if(!countriesToExclude.includes(country)) {
                idCount += 1;
                dropCountries.push(
                    <option key={`dropCountry${idCount}`} value={country}>{country}</option>
                    );
                }   
            }

            let viewFavs = <div>Explore some countries to add to your favorites!</div>;

            
                viewFavs = [<div id='favsButtonDiv'>
                    <button 
                    type='button' 
                    id='favsButton'
                    onClick={this.getFavs}>
                        View Favorites
                        </button>
                    </div>]


                const favorites = [];

                if (this.state.favsList.length) {

                    this.state.favsList.forEach((el, index) => {
                        let greenMark = "";
                        if (el.visited === true) {
                            console.log("you have visited", el.country)
                            greenMark = <HiCheckCircle size={16} class='reactIcon' /> 
                        }
                        favorites.push(
                            <div>
                                <button 
                                    type="button" 
                                    id={el.country}
                                    className="visitUnvisitButton" 
                                    onClick={(e) => {
                                        this.visitUnvisit(e)
                                        }}>
                                    Visit/Unvisit
                                </button>
                                &nbsp;
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
                                {greenMark}
                            </div>
                        )
                    })
                } else favorites.push(<div>Add some Favorites to get started</div>)


        
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