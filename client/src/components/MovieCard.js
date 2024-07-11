import React from 'react';
import "./MovieCard.css";


const MovieCard = ({ movie, onClick }) => {
  return (
    <div onClick={() => onClick(movie)}>
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
    </div>
  );
};

export default MovieCard;
