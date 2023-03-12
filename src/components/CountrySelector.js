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
        const getRequestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:${PORT}/favorites`, getRequestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log('data received from getFavs: ', data);
                this.setState({ favsList: data })
            })
    }


    deletor(e) {
        const { id } = e.target;
        const deleteRequestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch(`http://localhost:${PORT}/favorites`, deleteRequestOptions)
            .then((res) => res.json())
            .then((data) => {
                // this.setState({ favsList: data })
                // console.log('this.state.favsList: ', this.state.favsList);
            })
            this.getFavs();
    }

    visitUnvisit(e) {
        const { id } = e.target;
        const putRequestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                country: `${id}`
            })
        };
        fetch(`http://localhost:${PORT}/favorites`, putRequestOptions)
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
            };
            if(!countriesToExclude.includes(country)) {
                idCount += 1;
                dropCountries.push(
                    <option key={`dropCountry${idCount}`} value={country}>{country}</option>
                    );
                }   
            };


                const favorites = [];

                if (this.state.favsList.length) {

                    this.state.favsList.forEach((el, index) => {
                        let greenMark = "";
                        if (el.visited === true) {
                            greenMark = <HiCheckCircle size={16} class='reactIcon' /> 
                        }
                        favorites.push(
                            <div>
                                <button 
                                    type="button" 
                                    id={el.country}
                                    className="favsButton" 
                                    onClick={(e) => {this.visitUnvisit(e)}}>
                                    Visit/Unvisit
                                </button>
                                &nbsp;
                                <button 
                                    type="button" 
                                    id={el.country}
                                    className="favsButton" 
                                    onClick={(e) => {this.deletor(e)}}>
                                    Delete
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                {el.country}
                                {greenMark}
                            </div>
                        )
                    })
                } else favorites.push(<h3>Add some Favorites to get started!</h3>)


        
        return (
            <div id='CountrySelector'>
                    <h1>Select A Country</h1>
                    <select id='dropdown' onChange={(e) => {
                        this.props.changeCurrCountry(e.target.value)
                    }}>
                        {dropCountries}
                    </select>
                    <div id='favs-button-div'>
                        <button type='button' id='favsButton' onClick={this.getFavs}>
                        View Favorites
                        </button>
                    </div>
                    <div id='favs-in-selector'>
                        {favorites}
                    </div>
                </div>
            )
              
    }


}


export default CountrySelector