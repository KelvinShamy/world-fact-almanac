import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: []
    },
    reducers: {
        addFavorite (state, action) {
            // REDUX: I need to prevent dupes from being added to favorites
            
            const isDupe = state.favorites.includes((el) => el._id == action.payload._id);
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
