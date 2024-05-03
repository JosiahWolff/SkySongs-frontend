import React, { useState } from "react";
import "./SearchSpotify.css";
import SearchBar from "../SearchBar/SearchBar";
import MusicSection from "../MusicSection/MusicSection";

const SearchSpotify = ({ onCreateModal, onSelectCard }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (tracks) => {
    setSearchResults(tracks);
  };

  return (
    <div className="spotify">
      <SearchBar onSearch={handleSearch} />

      <div className="spotify__items-container">
        <div className="spotify__clothing-header">
          <div className="spotify__clothing-text">Top 12 Results:</div>
        </div>

        <div className="spotify__items">
          <MusicSection
            songs={searchResults}
            onCreate={onCreateModal}
            onSelectCard={onSelectCard}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSpotify;
