import React, { useState, useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css";
import {
  fetchAudioFeaturesForTrack,
  getAccessToken,
} from "../../utils/SpotifyApi";

const SongModal = ({ selectedCard, onClose }) => {
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

  return (
    <div className="modal">
      <div className="modal__preview">
        <button
          type="button"
          onClick={onClose}
          className="close__button"
        ></button>
        <img src={imageUrl} className="modal__image" alt={selectedCard.name} />
        <div className="modal__card_info">
          <div>
            <p className="modal__card_name">Song Name: {selectedCard.name}</p>
            {selectedCard.artists && (
              <p className="modal__card_name">
                Artist: {selectedCard.artists[0].name}
              </p>
            )}
            {selectedCard.album && (
              <p className="modal__card_name">
                Album: {selectedCard.album.name}
              </p>
            )}
          </div>
          <div>
            {error ? (
              <p className="modal__error">{error}</p>
            ) : (
              <>
                <p className="modal__card_valence">
                  Valence:{" "}
                  {valence !== null ? `${Math.round(valence * 100)}%` : "N/A"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongModal;
