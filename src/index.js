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
import { createRoot } from 'react-dom/client';
import App from './components/App.js'
// import { Provider } from 'react-dom';
// import store from './store'
// TWO IMPORTS ABOVE IF REDUX IS TO BE IMPLEMENTED

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <App/>
);