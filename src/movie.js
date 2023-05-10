import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { fetchMovie } from './utils';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovie(id)
      .then((data) => setMovie(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return <div className="container">{error}</div>;
  }

  if (!movie) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">{movie.Title}</h1>
              <p className="card-text">{movie.Plot}</p>
              <p className="card-text"><strong>Director:</strong> {movie.Director}</p>
              <p className="card-text"><strong>Actors:</strong> {movie.Actors}</p>
              <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
              <p className="card-text"><strong>Runtime:</strong> {movie.Runtime}</p>
              <p className="card-text"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;