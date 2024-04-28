import "./MusicSection.css";
import SongCard from "../SongCard/SongCard";

import React from "react";

function MusicSection({ songs, onSelectCard, handleOpenSongModal }) {
  return (
    <section className="music__section">
      {songs.map((item) => (
        <SongCard
          key={item.id}
          item={item}
          onSelectCard={onSelectCard}
          handleOpenSongModal={handleOpenSongModal}
        />
      ))}
    </section>
  );
}

export default MusicSection;
