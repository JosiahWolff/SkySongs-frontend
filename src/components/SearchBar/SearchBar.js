import React, { useState } from "react";
import "./SearchBar.css";
import spotifyLogo from "../../images/SpotifyLogo.png";
import { getAccessToken, searchTracks } from "../../utils/SpotifyApi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = await getAccessToken();
      const tracks = await searchTracks(accessToken, query);
      onSearch(tracks);
    } catch (error) {
      console.error("Error searching for tracks:", error);
    }
  };

  return (
    <div className="spotify__info">
      <div className="spotify__info-container">
        <img
          className="spotify__avatar"
          src={spotifyLogo}
          alt="spotify avatar"
        />
        <div className="searchbar__search">
          <p className="spotify__search-title">Search Songs</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="search__input"
              placeholder="Search Song or Artist"
              minLength={1}
              maxLength={30}
              required
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit" className="search__submit">
              <p className="search__buttontxt">Search</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
