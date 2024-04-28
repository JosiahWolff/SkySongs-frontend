import React, { useState, useEffect } from "react";
import "./Main.css";
import SongCard from "../SongCard/SongCard";

function Main({ weatherTemp, onSelectCard, getAccessToken }) {
  const [songs, setSongs] = useState([]);
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    const temperatureF = weatherTemp?.temperature?.F || 999;
    let type = "";

    if (temperatureF >= 70) {
      type = "sunny";
    } else if (temperatureF <= 65) {
      type = "cold";
    } else {
      type = "rainy";
    }

    setWeatherType(type);
  }, [weatherTemp]);

  const handleSearch = async () => {
    try {
      // Fetch access token
      const accessToken = await getAccessToken();

      let seedTracks = "";
      if (weatherType === "sunny") {
        seedTracks = "4NHQUGzhtTLFvgF5SZesLK,0c6xIDDpzE81m2q797ordA"; // Example seed tracks
      } else if (weatherType === "rainy") {
        seedTracks = "0c6xIDDpzE81m2q797ordA,3FmRBtcYgOJ06u5QFLzI1g"; // Example seed tracks
      } else {
        seedTracks = "3FmRBtcYgOJ06u5QFLzI1g,4NHQUGzhtTLFvgF5SZesLK"; // Example seed tracks
      }
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&limit=15`, // Using seed tracks
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(
          `Failed to fetch recommendations: ${response.status} ${response.statusText}`
        );
      }

      // Parse response JSON
      const data = await response.json();

      // Update the state with the received recommendations
      setSongs(data.tracks);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const displaySongs = songs.slice(0, 10);

  return (
    <main>
      <section className="main__section" id="clothing-card-section">
        <p className="itemCard__description">
          Today's weather is: {weatherType}
          <button type="button" className="main__button" onClick={handleSearch}>
            Find Songs
          </button>
        </p>

        <div className="card_items">
          {displaySongs.map((item) => (
            <SongCard
              key={item.id}
              item={item}
              onSelectCard={onSelectCard}
              link={item.link}
              name={item.name}
              weather={item.weather}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
