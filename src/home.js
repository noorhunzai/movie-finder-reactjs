import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMovieById } from './api';
import './home.css';
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    console.log('Search term:', searchTerm);
    const response = await fetch(`https://www.omdbapi.com/?apikey=f8586019&s=${searchTerm}`);
    const data = await response.json();
    console.log('API response:', data);
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleMovieClick = async (event, imdbID) => {
    event.preventDefault();
    const movie = await getMovieById(imdbID);
    console.log('Movie details:', movie);
    history.push(`/movie/${imdbID}`, { movie });
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <div key={movie.imdbID} className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer" onClick={(event) => handleMovieClick(event, movie.imdbID)}>
          <div className="card">
            <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">{movie.Year}</p>
            </div>
          </div>
        </a>
        <div className="mt-2">
        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer" className="btn btn-warning">View on IMDb</a>
      </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-4 mb-3">
        <div className="col-12 col-md-8">
          <div className="form">
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a movie"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="col-auto col-auto mx-auto">
                <button className="btn btn-primary" onClick={handleSearchClick}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">{renderMovies()}</div>
    </div>
  );
};

export default Home;

