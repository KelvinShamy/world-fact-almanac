import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: []
    },
    reducers: {
        addFavorite (state, action) {
            // REDUX: I need to prevent dupes from being added to favorites
            // This function is being called for every element...

            // console.log('state.favorites', state.favorites);
            // console.log('state', state);

            console.log('Object.keys(action.payload):', Object.keys(action.payload));
            console.log('typeof action.payload:', typeof action.payload);

            
            // THIS LINE SEEMS TO BE THE PROBLEM:
            const isDupe = state.favorites.includes((el) => el._id == action.payload._id);
            // THIS LINE SEEMS TO BE THE PROBLEM ^^

            console.log('isDupe:', isDupe);

            state.favorites.push({
                ...action.payload
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

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
