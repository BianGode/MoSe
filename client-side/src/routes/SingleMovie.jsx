import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "../assets/styles/SingleMovie.css";

function SingleMovie() {
  const [movieData, setMovieData] = useState("");
  const location = useLocation();
  let id = location.pathname.split("singlemovie/")[1];

  useEffect(() => {
    getSingleMovie();
  }, []);

  function getSingleMovie() {
    axios
      .get("http://localhost:5000/singleMovie", {
        params: {
          id: id,
        },
      })
      .then((result) => {
        setMovieData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="single-movie-wrap">
      {movieData.length !== 0 ? (
        <>
          {window.innerWidth > 900 ? (
            <div id='test'>
              <p>{movieData.movieDetails.title}</p>
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  movieData.movieDetails.poster_path
                }
                alt=""
                className="single-movie-poster"
              />
            </div>
          ) : (
            <>
              <p>{movieData.movieDetails.title}</p>
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  movieData.movieDetails.poster_path
                }
                alt=""
                className="single-movie-poster"
              />
            </>
          )}
          {movieData.cast.map((el) => {
            return (
              <>
                <p style={{ color: "white" }}>{el.profile_path}</p>
                {/* <p style={{ color: "white" }}>{el}</p> */}
                {/* <p style={{ color: "white" }}>{el}</p> */}
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + el.profile_path}
                  alt=""
                />
              </>
            );
          })}{" "}
        </>
      ) : (
        <p style={{ color: "white" }}>NO DATA YET!</p>
      )}
    </div>
  );
  // movieData.length !== 0 ? <p>{movieData.cast[0]}</p> : <p>NO DATA YET</p>
}

export default SingleMovie;
