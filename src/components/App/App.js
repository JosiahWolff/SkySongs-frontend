import "./App.css";
import Header from "../Header/Header";
import SearchSpotify from "../SearchSpotify/SearchSpotify";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SongPreview from "../SongPreview/SongPreview";
import About from "../About/About";

import {
  getForecastWeather,
  parseWeatherData,
  weatherLocation,
} from "../../utils/WeatherApi";

import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { getAccessToken } from "../../utils/SpotifyApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({ temperature: { F: 0, C: 0 } });
  const [location, setLocation] = useState("");
  const [songs] = useState([]);

  function handleOpenSongPreview() {
    setActiveModal("preview");
  }

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setLocation(weatherLocation(data));
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header
        location={location}
        temp={temp}
        onCreateModal={handleCreateModal}
      />

      <Switch>
        <Route exact path="/SkySongs-frontend">
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            songs={songs}
            handleOpenSongPreview={handleOpenSongPreview}
            getAccessToken={getAccessToken}
          />
        </Route>

        <Route path="/SearchSpotify">
          <SearchSpotify
            onSelectCard={handleSelectedCard}
            songs={songs}
            onCreateModal={handleCreateModal}
            handleOpenSongPreview={handleOpenSongPreview}
          />
        </Route>

        <Route path="/About">
          <About />
        </Route>
      </Switch>

      <Footer />

      {activeModal === "preview" && (
        <SongPreview selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
