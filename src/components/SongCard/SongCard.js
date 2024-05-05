import "./SongCard.css";

const SongCard = ({ item, onSelectCard }) => {
  const imageUrl = item.album.images.length > 0 ? item.album.images[0].url : "";

  return (
    <div className="card">
      <span className="card__name">{item.name}</span>
      <img
        src={imageUrl}
        className="card__image"
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </div>
  );
};

export default SongCard;
