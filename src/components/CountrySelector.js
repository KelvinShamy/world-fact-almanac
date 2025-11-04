import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';

const CountrySelector = ({
    favsList,
    countryOptions,
    changeCurrCountry,
    fetchFavorites,
    deleteFavorite,
    toggleVisited
}) => {    
    return (
        <div id="country-selector">
            <h1>Select A Country</h1>
            <select onChange={(e) => changeCurrCountry(e.target.value)}>
                {countryOptions.map((name, i) => (
                    <option key={name+i} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <div className="favs-button-div">
                <button type="button" onClick={fetchFavorites}>
                    Refresh Favorites
                </button>
            </div>
            <div className="favs-in-selector">
                {
                    favsList.length
                        ? favsList.map(({ _id, country, visited }) => {
                            return (
                                <div key={_id.toString()} className="favs-list-item">
                                    <div className="favs-list-item-buttons">
                                        <button 
                                            className="favs-button"
                                            type="button" 
                                            onClick={() => toggleVisited(country)}
                                        >
                                            {visited ? "Unvisit" : "Visit"}
                                        </button>
                                        <button 
                                            className="favs-button"
                                            type="button" 
                                            onClick={() => deleteFavorite(country)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div>
                                        {country}
                                        {visited && <HiCheckCircle size={12} className="react-icon" />}
                                    </div>
                                </div>
                            )})
                        : <h3 key={"addFavoritesText"}>Add some Favorites to get started!</h3>
                }
            </div>
        </div>
    )
};

export default CountrySelector;
