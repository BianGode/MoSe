import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/Home.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VideoJS from "../components/VideoJS";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState("");

  // const playerRef = useRef(null);
  const [timestamp1, setTimestamp1] = useState(null);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 910 ? true : false
  );

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
  const [isSearchFocused, setIsSearchFocus] = useState(false);

  const useOutsideClick = (callback) => {
    const reference = useRef();

    useEffect(() => {
      const handleClick = (event) => {
        if (reference.current && !reference.current.contains(event.target)) {
          console.log(reference.current);
          console.log(event.target);
          console.log(reference.current.contains(event.target));
          callback();
        } else {
          console.log("clicked inside!");
          console.log(isSearchFocused);
          setIsSearchFocus(true);
        }
      };

      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [reference]);

    return reference;
  };

  const removeActive = () => {
    console.log(isSearchFocused);

    setIsSearchFocus(false);

    // document.querySelector(".search-home").classList.contains("active")
    //   ? document.querySelector(".search-home").classList.remove("active")
    //   : null;
  };

  const ref = useOutsideClick(removeActive);

  function switchSearchBackground() {
    if (!isSearchFocused) {
      setIsSearchFocus(true);
    }
  }

  // call to node back-end
  function searchReqClientSide(searchParam) {
    axios
      .get("http://localhost:5000/search", {
        params: {
          search: searchParam,
        },
      })
      .then((res) => {
        console.log(res.data);

        setSearchRes(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(searchRes);
      });
  }

  function searchCall(e) {
    // setSearch(e.target.value)
    // console.log();

    searchReqClientSide(e.target.value);
  }

  return (
    <div className="home-wrapper">
      <div className="video-wrapper">
        <VideoJS options={videoJsOptions} setTimestamp1={setTimestamp1} />
        <div className="video-overlay" id="video-overlay"></div>
      </div>
      <div className="search-home-wrapper">
        <div className={isSearchFocused ? "search-home active" : "search-home"}>
          <h1>Search the movie you want</h1>
          <div className="search-input-wrap">
            <FontAwesomeIcon icon={faSearch} className="search-icon-home" />
            <input
              ref={ref}
              // onClick={() => switchSearchBackground()}
              type="text"
              // value={search}
              onChange={(e) => searchCall(e)}
            />
          </div>
        </div>
      </div>
      {searchRes.length !== 0 ? (
        <div className="result-wrapper">
          {searchRes.map((el, index) => {
            return (
              <div className="result-card" key={index}>
                <p className="result-home-p" style={{ color: "white" }}>{el.title}</p>
                {!isMobile ? (
                  <div className="result-image-wrap">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" + el.poster_path
                      }
                      alt={el.title}
                    />
                    <div className="result-overlay">
                      {Math.round(el.vote_average * 10) / 10}
                    </div>
                  </div>
                ) : (
                  <img
                    className="result-image-mob"
                    src={
                      "https://image.tmdb.org/t/p/original/" + el.poster_path
                    }
                    alt={el.title}
                  />
                )}
                <p>{el.release_date}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Home;
