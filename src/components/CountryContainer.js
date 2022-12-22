import React, { Component } from 'react';
import CountryDisplay from './CountryDisplay';
import CountrySelector from './CountrySelector';


class CountryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // store currCountry here
            currCountry: null,
            currIsFav: null,
        }
        this.changeCurrCountry = this.changeCurrCountry.bind(this);
    }
    
    // BLAH BLAH BLAH BLAH BLAH
    // BLAH BLAH BLAH BLAH BLAH
    // BLAH BLAH BLAH BLAH BLAH
   
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