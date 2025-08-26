// entry point for application. Hangs React app off of #contents in index.html

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import App from './components/App.js'

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);