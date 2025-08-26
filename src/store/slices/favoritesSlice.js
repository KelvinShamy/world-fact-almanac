import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: favorites,
    initialState: {
        favorites: [
            { 
                country: 'Tierra Imaginaria',
                visited: false,
            }
        ]
    },
    reducers: {
        addFavorite (state, action) {
            console.log('favorites/addFavorite fired w/ action:', action);
            state.favorites.push({
                country: action.payload.country,
                visited: action.payload.visited,
            });
        },
        removeFavorite (state, action) {
            console.log('favorites/removeFavorite fired w/ action:', action);
            const newState = state.favorites.filter((fav) => {
                return fav._id !== action.payload
            });
            // I can access this _id property that is auto-created by Mongo
            state.favorites = newState;
        },
    }
});
