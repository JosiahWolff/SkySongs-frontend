import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>

      <p className="preloader__text">Searching for songs...</p>
    </div>
  );
};

export default Preloader;
