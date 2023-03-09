import React, { Component } from 'react';
import CountryDisplay from './CountryDisplay';
import CountrySelector from './CountrySelector';


// this becomes functional component
class CountryContainer extends Component {
    // hook for currCountry
    // hook for currIsFav (?)
    constructor(props) {
        super(props);
        this.state = {
            // store currCountry here
            currCountry: null,
            currIsFav: null,
        }
        this.changeCurrCountry = this.changeCurrCountry.bind(this);
        // this should be unnecessary with hooks
    }
    
   
    changeCurrCountry(newCountry) {
        this.setState({ currCountry: newCountry })
    }


    render() {

        return (
            <div  id='CountryContainer'>
                <CountryDisplay currCountry={this.state.currCountry} currIsFav={this.state.currIsFav}/>
                <CountrySelector changeCurrCountry={this.changeCurrCountry}/>
            </div>
        )
    }
}



export default CountryContainer;