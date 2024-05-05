import React, { useState } from "react";
import "./SearchBar.css";
import spotifyLogo from "../../images/SpotifyLogo.svg";
import { getAccessToken, searchTracks } from "../../utils/SpotifyApi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = await getAccessToken();
      const tracks = await searchTracks(accessToken, query);
      onSearch(tracks);
      setError(null);
    } catch (error) {
      console.error("Error searching for tracks:", error);
      setError(error.message);
    }
  };

  return (
    <div className="search">
      <div className="search__container">
        <img className="search__logo" src={spotifyLogo} alt="spotify avatar" />
        <div className="search__searchbar">
          <p className="search__title">Search Songs</p>
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
          {error && <p className="error__message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
