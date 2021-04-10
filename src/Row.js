import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios.js";
import requests from "./request.js";
import movieTrailer from "movie-trailer";
import "./Row.css";
const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerID, settrailerID] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
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
  console.log(trailerID);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="row">
      <h2
        style={{
          color: "white",
        }}
      >
        {title}
      </h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLarge && "row_posterLarge"}`}
            src={`${base_url}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerID && <YouTube videoId={trailerID} opts={opts} />}
    </div>
  );
}

export default Row;
