import { createSlice, nanoid } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: favorites,
    initialState: {
        favorites: [
            { 
                country: 'Tierra Imaginaria',
                visited: false,
                id: nanoid()
            }
        ]
    },
    reducers: {
        addFavorite (state, action) {
            console.log('favorites/addFavorite fired w/ action:', action);
            state.favorites.push({
                country: action.payload.country,
                visited: action.payload.visited,
                id: nanoid()
            });
        },
        removeFavorite (state, action) {
            console.log('favorites/removeFavorite fired w/ action:', action);
            const newState = state.favorites.filter((fav) => {
                return fav.id !== action.payload
            });
            state.favorites = newState;
        },
    }
});
