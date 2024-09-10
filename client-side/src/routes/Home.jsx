import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/Home.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VideoJS from "../components/VideoJS";
import { useRef } from "react";

function Home() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    muted: true,
    loop: true,
    // responsive: true,
    fluid: false,
    sources: [{
      src: '../../public/header-movie.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    
    player.on('waiting', () => {
      videojs.log('player is waiting')
    })

    player.on('dispose', () => {
      videojs.log('player will dispose');
    })
  }

  return (
    <div className="home-wrapper">
      <div className="search-wrap-home">
        {/* <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className="search-results"></div> */}
      </div>
      <div className="video-wrapper">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
        <div className="video-overlay"></div>
      </div>
    </div>
  );
}

export default Home;
