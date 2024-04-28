import "./SongCard.css";

const SongCard = ({ item, onSelectCard }) => {
  const imageUrl = item.album.images.length > 0 ? item.album.images[0].url : "";

  return (
    <div>
      <div className="card_name">{item.name}</div>
      <img
        src={imageUrl}
        className="card_image"
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </div>
  );
};

export default SongCard;
