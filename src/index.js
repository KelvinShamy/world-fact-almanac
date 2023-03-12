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

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
    <App />
);