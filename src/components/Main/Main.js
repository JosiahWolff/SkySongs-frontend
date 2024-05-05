import React, { useState, useEffect } from "react";
import "./Main.css";
import SongCard from "../SongCard/SongCard";

function Main({ weatherTemp, onSelectCard, getAccessToken }) {
  const [songs, setSongs] = useState([]);
  const [weatherType, setWeatherType] = useState("");

  const handleFindSongs = async () => {
    try {
      const accessToken = await getAccessToken();
      let seedTracks = "";
      if (weatherType === "sunny") {
        seedTracks = "4NHQUGzhtTLFvgF5SZesLK,0c6xIDDpzE81m2q797ordA";
      } else if (weatherType === "rainy") {
        seedTracks = "0c6xIDDpzE81m2q797ordA,3FmRBtcYgOJ06u5QFLzI1g";
      } else {
        seedTracks = "3FmRBtcYgOJ06u5QFLzI1g,4NHQUGzhtTLFvgF5SZesLK";
      }
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&limit=15`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch recommendations: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setSongs(data.tracks);
    } catch (error) {
      error("Error fetching recommendations:", error);
    }
  };

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

  const displaySongs = songs.slice(0, 12);

  return (
    <main className="main">
      <section className="main__section" id="clothing-card-section">
        <p className="main__description">
          Today's weather is: {weatherType}
          <button
            type="button"
            className="main__button"
            onClick={handleFindSongs}
          >
            Find Songs
          </button>
        </p>

        <div className="main__card-items">
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
