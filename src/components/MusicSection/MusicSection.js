import "./MusicSection.css";
import SongCard from "../SongCard/SongCard";

import React from "react";

function MusicSection({ songs, onSelectCard, handleOpenSongPreview }) {
  return (
    <section className="music__section">
      {songs.map((item) => (
        <SongCard
          key={item.id}
          item={item}
          onSelectCard={onSelectCard}
          handleOpenSongPreview={handleOpenSongPreview}
        />
      ))}
    </section>
  );
}

export default MusicSection;
