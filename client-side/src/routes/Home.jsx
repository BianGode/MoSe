import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/Home.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VideoJS from "../components/VideoJS";
import { useRef, useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  const playerRef = useRef(null);
  const [timestamp1, setTimestamp1] = useState(null);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    muted: true,
    loop: true,
    // responsive: true,
    fluid: false,
    sources: [
      {
        src: "../../public/header-movie.mp4",
        type: "video/mp4",
      },
    ],
  };

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player;

  // };

  return (
    <div className="home-wrapper">
      <div className="video-wrapper">
        <VideoJS options={videoJsOptions} setTimestamp1={setTimestamp1} />
        <div className="video-overlay"></div>
      </div>
      <div className="search-home-wrapper">
        <div className="search-home">
          <h1>Search the movie you want</h1>
          <div className="search-input-wrap">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
