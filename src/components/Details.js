import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { BsStarHalf } from "react-icons/bs";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import defaultImage from "../assets/no-image.jpg";

const Details = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [movie, setMovie] = useState();

  const fetchMovie = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US`
    );
    const movie = await data.json();
    setMovie(movie);
  };

  useEffect(() => {
    fetchMovie(params.movieId);
  }, [movie]);

  return (<>
    <Player
  src={[
    {
      quality: "Full HD",
      url:
        "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/1080.mp4",
    },
    {
      quality: 720,
      url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/720.mp4",
    },
    {
      quality: 480,
      url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/480.mp4",
    },
  ]}
  subtitles={[
    {
      lang: "en",
      language: "English",
      url:
        "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt",
    },
    {
      lang: "fr",
      language: "French",
      url:
        "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt",
    },
  ]}
  poster="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/poster.png"
/>
    <div>
      <div className="back">
        <MdArrowBack onClick={() => navigate(-1)} />
      </div>
      {movie && (
        <div className="container details">
          <h1 className="section-title">{movie.original_title}</h1>
          {movie.poster_path !== null ? (
            <img
              className="img-bg"
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            />
          ) : (
            <img className="img-bg" src={defaultImage} />
          )}
          <div>
            <h4>Overview</h4>
            <p>{movie.overview}</p>
          </div>
          <div>
            <h4>Rating</h4>
            <p id="rate">
              <BsStarHalf />
              {movie.vote_average}
            </p>
          </div>
          <div>
            <h4>Film genres</h4>
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Production companies</h4>
            <ul>
              {movie.production_companies.map((company) => (
                <li key={company.id}>{company.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Production countries</h4>
            <ul>
              {movie.production_countries.map((prod) => (
                <li>{prod.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Release</h4>
            <p>{movie.release_date}</p>
          </div>
          <div>
            <a href={movie.homepage}>
              <span> Film page </span>
              <FiExternalLink />
            </a>
          </div>
        </div>
        
      )}
    </div>
    </>
  );
};

export default Details;
