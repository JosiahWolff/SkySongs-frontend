import React, { useState, useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css";
import "./SongPreview.css";
import {
  fetchAudioFeaturesForTrack,
  getAccessToken,
} from "../../utils/SpotifyApi";

const SongPreview = ({ selectedCard, onClose }) => {
  const [valence, setValence] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const audioFeatures = await fetchAudioFeaturesForTrack(
          selectedCard.id,
          accessToken
        );

        setValence(audioFeatures.valence);
        setError(null);
      } catch (error) {
        console.error("Error fetching audio features:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [selectedCard]);

  const imageUrl =
    selectedCard.album && selectedCard.album.images.length > 0
      ? selectedCard.album.images[0].url
      : "";

  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <div className="preview" onClick={handleClose}>
      <div className="preview__overlay"></div>
      <div className="preview__song">
        <button
          type="button"
          onClick={onClose}
          className="preview__button"
        ></button>
        <img
          src={imageUrl}
          className="preview__image"
          alt={selectedCard.name}
        />
        <div className="preview__card-info">
          <div>
            <p className="preview__card-name">Song Name: {selectedCard.name}</p>
            {selectedCard.artists && (
              <p className="preview__card-name">
                Artist: {selectedCard.artists[0].name}
              </p>
            )}
            {selectedCard.album && (
              <p className="preview__card-name">
                Album: {selectedCard.album.name}
              </p>
            )}
            <p className="preview__card-name">
              Valence:{" "}
              {valence !== null ? `${Math.round(valence * 100)}%` : "N/A"}
            </p>
            {error ? <p className="preview__error">{error}</p> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPreview;
