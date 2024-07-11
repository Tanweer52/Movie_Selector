// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import "./MovieDetails.css";

// const MovieDetail = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=d0584653`);
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Error fetching movie details', error);
//       }
//     };
//     fetchMovie();
//   }, [id]);

//   return (
//     <div className="movie-detail">
//       {movie ? (
//         <>
//           <h2>{movie.Title}</h2>
//           <p>{movie.Plot}</p>
//           <img src={movie.Poster} alt={movie.Title} />
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default MovieDetail;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=d0584653`);
        setMovie(response.data);

        // Example: Fetching actors and reviews (assuming these details are available in your API response)
        setActors(response.data.Actors.split(', ')); // Splitting actors string into an array
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };
    fetchMovie();
  }, [id]);

  return (
    <div className="movie-detail">
      {movie ? (
        <>
          <div className="movie-info">
            <div className="left">
              <h2>{movie.Title}</h2>
              <p>{movie.Plot}</p>
              <h3>Actors:</h3>
              <ul>
                {actors.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
            <div className="right">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetail;
