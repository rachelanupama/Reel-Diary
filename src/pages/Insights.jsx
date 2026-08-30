import { useState } from "react";
import Sidebar from "../Sidebar";


function Insights(props) {

  const [pickedMovie, setPickedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Drama");
  const [genreMovie, setGenreMovie] = useState(null);

  const allGenres = [
    ...new Set(
      props.movies.flatMap(
        movie => movie.genre?.split(", ") || []
      )
    )
  ];

  const hallOfFameMovies =
    props.movies.filter(movie => movie.rating === 5);

  return (
     <div className="layout">

      <Sidebar
        activeSection=""
        setActiveSection={() => {}}
        sortType="default"
        setSortType={() => {}}
      />
    <div className="main-content">

      <h1>📊 Insights</h1>

      <div className="stats-bar">

        <div className="stat-card">
          <span>{props.averageRating}</span>
          <p>Average Rating</p>
        </div>

        <div className="stat-card">
          <span>{props.favoriteGenre}</span>
          <p>Favorite Genre</p>
        </div>

        <div className="stat-card">
          <span>{props.highestRatedMovie?.name || "None"}</span>
          <p>Highest Rated Movie</p>
        </div>

      </div>

      <div className="recommendations-section">

   
        {/* WATCHLIST ROULETTE */}
<div className="recommendation-panel">

  <h2>🎲 Watchlist Roulette</h2>

  <div className="genre-control-box">

    <button
      className="action-btn"
      onClick={() => {

        if (!props.watchlistMovies?.length) return;

        const randomMovie =
          props.watchlistMovies[
            Math.floor(
              Math.random() *
              props.watchlistMovies.length
            )
          ];

        setPickedMovie(randomMovie);

      }}
    >

      Pick For Me

    </button>

  </div>

  {pickedMovie && (

    <div className="recommendation-card">

      <img
        src={pickedMovie.poster}
        alt={pickedMovie.name}
      />

      <h3>
        {pickedMovie.name}
      </h3>

      <p>
        {pickedMovie.genre?.split(", ")[0]}
      </p>

      <span>
        {pickedMovie.year}
      </span>

    </div>

  )}

</div>

        <div className="recommendation-panel">

  <h2>🎭 Genre Roulette</h2>

  <div className="genre-control-box">

    <select
      className="genre-select"
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
    >
      {allGenres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>

    <button
      className="action-btn"
      onClick={() => {
        const matchingMovies = props.movies.filter(movie =>
          movie.genre?.includes(selectedGenre)
        );

        if (matchingMovies.length === 0) return;

        const randomMovie =
          matchingMovies[Math.floor(Math.random() * matchingMovies.length)];

        setGenreMovie(randomMovie);
      }}
    >
      Pick Movie
    </button>

  </div>

  {genreMovie && (
    <div className="recommendation-card">
      <img src={genreMovie.poster} alt={genreMovie.name} />

      <h3>{genreMovie.name}</h3>

      <p>{genreMovie.genre?.split(", ")[0]}</p>

      <span>{genreMovie.year}</span>
    </div>
  )}

</div>

      </div>

      <h2>🏆 Hall of Fame</h2>

      <div className="hall-of-fame-grid">

        {hallOfFameMovies.length > 0 ? (
          hallOfFameMovies.map((movie) => (
            <div
              key={movie.id}
              className="hall-of-fame-card"
            >
              <img src={movie.poster} alt={movie.name} />
              <h3>{movie.name}</h3>
              <p>💜💜💜💜💜</p>
            </div>
          ))
        ) : (
          <p>No 5-heart movies yet.</p>
        )}

      </div>

    </div>
    </div>
  );
}

export default Insights;