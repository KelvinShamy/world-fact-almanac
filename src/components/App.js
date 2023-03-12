import '../main.css'; 
import React, { Component } from 'react';
import CountryContainer from './CountryContainer.js'

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id='renders CountryContainer'>
                <CountryContainer/>
            </div>
        )
    }
};

export default App;