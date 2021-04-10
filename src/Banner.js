import React, { useEffect, useState } from "react";
import requests from "./request.js";
import axios from "./axios.js";
import "./banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
function Banner() {
  const [movies, setMovie] = useState([]);
  const [trailerID, settrailerID] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  console.log(movies);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const handleClick = (movie) => {
    if (trailerID) {
      settrailerID("");
    } else {
      console.table(movie);
      console.log(movie?.name || movie?.title || movie?.original_title || "");
      movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerID(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      {/* {trailerID && <YouTube videoId={trailerID} opts={opts} />} */}
      <div className="banner_content">
        <h1 className="banner_title">
          {movies?.title || movies?.name || movies?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => handleClick(movies)}>
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movies?.overview, 150)}
        </h1>
      </div>
      <div className="banner_fadebutton" />
    </header>
  );
}

export default Banner;
