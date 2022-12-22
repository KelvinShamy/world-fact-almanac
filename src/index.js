/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application. Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import styles from './main.css';
// import { Provider } from 'react-dom';

import App from './components/App.js'
// import store from './store'  ONLY NECESSARY FOR REDUX ??

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
     // <div>Me Wee Div</div>,
    // <Provider>
    //     <App />
    // </Provider>,
    <App/>
    // document.getElementById('root')
);

// everything in client folder must be run and tested in the browser