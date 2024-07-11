import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./MovieList.css";

const MovieList = ({ onLogout }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://www.omdbapi.com/?s=star&apikey=d0584653');
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {/* <button onClick={onLogout}>Logout</button> */}
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
