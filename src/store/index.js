import { configureStore } from '@reduxjs/toolkit';
// import reducers, etc. from slices here
import { favoritesReducer } from './slices/favoritesSlice';

const store = configureStore({
    reducer:{
        favorites: favoritesReducer,
    }
});

export {
    store
};
