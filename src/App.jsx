import { useState, useEffect } from "react";

import {Routes,Route,Link} from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";

import Home from "./pages/Home";
import TopPicks from "./pages/TopPicks";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";
import Insights from "./pages/Insights";

import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

import "./App.css";

function App() {

  const [movies, setMovies] = useState(() => {

    const savedMovies =
      localStorage.getItem("movies");

    return savedMovies
      ? JSON.parse(savedMovies)
      : [];

  });

  const [movieInput, setMovieInput] =
    useState("");

  const [ratingInput, setRatingInput] =
    useState(0);

  const [searchInput, setSearchInput] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  const [movieMemory, setMovieMemory] =
    useState("");

  const [hoveredRating, setHoveredRating] =
    useState(0);
  
  const [loading, setLoading] = 
    useState(false);

  const [sortType, setSortType] =
    useState("default");

  const [selectedGenre, setSelectedGenre] =
    useState("All");

  const [activeSection, setActiveSection] =
    useState("home");

  useEffect(() => {

    localStorage.setItem(
      "movies",
      JSON.stringify(movies)
    );

  }, [movies]);

  async function addMovie() {

    if (!movieInput) return;
    setLoading(true);

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=d2735180&t=${movieInput}`
    );

    const data = await response.json();

    const newMovie = {

      id: Date.now(),

      name: data.Title,

      rating: ratingInput,

      watched: true,

      favorite: false,

      poster: data.Poster,

      year: data.Year,

      genre: data.Genre,

      plot: data.Plot,

      actors: data.Actors,

      runtime: data.Runtime,

      note: movieMemory,

    };

    setMovies([...movies, newMovie]);

    setMovieInput("");

    setRatingInput(0);

    setHoveredRating(0);

    setMovieMemory("");

    setLoading(false);

  }

  function deleteMovie(idToDelete) {

    const updatedMovies =
      movies.filter(
        (movie) =>
          movie.id !== idToDelete
      );

    setMovies(updatedMovies);

  }

  function toggleWatched(idToToggle) {

    const updatedMovies =
      movies.map((movie) => {

        if (movie.id === idToToggle) {

          return {

            ...movie,

            watched: !movie.watched

          };

        }

        return movie;

      });

    setMovies(updatedMovies);

  }

  function toggleFavorite(idToToggle) {

    const updatedMovies =
      movies.map((movie) => {

        if (movie.id === idToToggle) {

          return {

            ...movie,

            favorite: !movie.favorite

          };

        }

        return movie;

      });

    setMovies(updatedMovies);

  }
  const recentMovies =
  [...movies]
    .reverse()
    .slice(0, 4);
  
const genres = [

  "All",

  "Action",

  "Drama",

  "Comedy",

  "Sci-Fi",

  "Thriller",

  "Romance",

  "Horror"

  

];

 const filteredMovies =
  movies.filter((movie) => {

    const matchesSearch =
      movie.name
        .toLowerCase()
        .includes(
          searchInput.toLowerCase()
        );

    const matchesGenre =

      selectedGenre === "All"

      ||

      movie.genre?.includes(
        selectedGenre
      );

    return (
      matchesSearch &&
      matchesGenre
    );

  });
    const sortedMovies =
  [...filteredMovies].sort((a, b) => {

    if (sortType === "rating") {

      return b.rating - a.rating;

    }

    if (sortType === "alphabetical") {

      return a.name.localeCompare(
        b.name
      );

    }

    if (sortType === "year") {

      return b.year - a.year;

    }

    return 0;

  });

  const favoriteMovies =
    sortedMovies.filter(
      (movie) => movie.favorite
    );

    

  const watchedMovies =
    sortedMovies.filter(
      (movie) => movie.watched
    );

  const watchlistMovies =
    sortedMovies.filter(
      (movie) => !movie.watched
    );
    const favoritePreview =
  favoriteMovies.slice(0, 4);

const watchlistPreview =
  watchlistMovies.slice(0, 4);

const watchedPreview =
  watchedMovies.slice(0, 4);

  const averageRating =
  movies.length > 0
    ? (
        movies.reduce(
          (total, movie) =>
            total + movie.rating,
          0
        ) / movies.length
      ).toFixed(1)
    : 0;

  const genreCount = {};

movies.forEach((movie) => {

  if (!movie.genre) return;

  const firstGenre =
    movie.genre.split(",")[0];

  genreCount[firstGenre] =
    (genreCount[firstGenre] || 0) + 1;

});

const favoriteGenre =
  Object.keys(genreCount).length
    ? Object.keys(genreCount).reduce(
        (a, b) =>
          genreCount[a] >
          genreCount[b]
            ? a
            : b
      )
    : "None";


  const highestRatedMovie =
  [...movies].sort(
    (a, b) =>
      b.rating - a.rating
  )[0];

  async function fetchSuggestions(searchText) {

    if (searchText.length < 2) {

      setSuggestions([]);

      return;

    }

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=d2735180&s=${searchText}`
    );

    const data = await response.json();

    if (data.Search) {

      setSuggestions(data.Search);

    } else {

      setSuggestions([]);

    }

  }

  return (
    <>
    <ScrollToTop />

  <Routes>

    <Route
      path="/"
      element={

        <div className="layout">

       <Sidebar
    activeSection={activeSection}
    setActiveSection={setActiveSection}
    sortType={sortType}
    setSortType={setSortType}
  />

      <main className="main-content">

        <div className="hero-section">

          <div className="hero-overlay">

            <p className="hero-tag">
              YOUR PERSONAL MOVIE DIARY
            </p>

            <h1>
              ReelDiary
            </h1>

            <p className="hero-subtitle">
              Track the films you loved,
              hated, and survived emotionally.
            </p>

          </div>

        </div>

        <div className="stats-bar">

          <div className="stat-card">

            <span>{movies.length}</span>

            <p>Movies Logged</p>

          </div>

          <div className="stat-card">

            <span>
              {favoriteMovies.length}
            </span>

            <p>Top Picks</p>

          </div>

          <div className="stat-card">

            <span>
              {watchedMovies.length}
            </span>

            <p>Watched</p>

          </div>

          <div className="stat-card">

            <span>
              {watchlistMovies.length}
            </span>

            <p>Watchlist</p>

          </div>

        </div>

        

        <div className="search-controls">

          <div className="search-wrapper">

  <span className="search-icon">
    🔍
  </span>

  <input
    type="text"

    className="search-bar"

    placeholder="Search Movies..."

    value={searchInput}

    onChange={(e) =>
      setSearchInput(e.target.value)
    }
  />

</div>

          <div className="autocomplete-container">
            <input
  type="text"

  className="movie-input"

  placeholder="Enter Movie Name"

  value={movieInput}

  onChange={(e) => {

    setMovieInput(
      e.target.value
    );

    fetchSuggestions(
      e.target.value
    );

  }}

  onKeyDown={(e) => {

    if (e.key === "Enter") {

      addMovie();

    }

  }}
/>


            {suggestions.length > 0 && (

              <ul className="suggestions-list">

                {suggestions.map((movie) => (

                  <li
                    key={movie.imdbID}

                    onClick={() => {

                      setMovieInput(
                        movie.Title
                      );

                      setSuggestions([]);

                    }}
                  >

                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                    />

                    <div>

                      <p>{movie.Title}</p>

                      <span>{movie.Year}</span>

                    </div>

                  </li>

                ))}

              </ul>

            )}

          </div>
 

          <div
            className="rating-picker"

            onMouseLeave={() =>
              setHoveredRating(0)
            }
          >

            {[1,2,3,4,5].map((heart) => {

              const active =
                hoveredRating >= heart ||
                ratingInput >= heart;

              return (

                <span
                  key={heart}

                  className={`
                    rating-heart
                    ${active ? "active-heart" : ""}
                  `}

                  onMouseEnter={() =>
                    setHoveredRating(heart)
                  }

                  onClick={() => {

                    if (
                      ratingInput === heart
                    ) {

                      setRatingInput(0);

                    } else {

                      setRatingInput(heart);

                    }

                  }}
                >

                  {
                    active
                      ? "💜"
                      : "🖤"
                  }

                </span>

              );

            })}

          </div>

          <input
            type="text"

            className="memory-input"

            placeholder="Memory / Note"

            value={movieMemory}

            onChange={(e) =>
              setMovieMemory(
                e.target.value
              )
            }
          />
<button
  className="add-movie-btn"

  onClick={addMovie}

  disabled={loading}
>
  {
    loading
      ? "Adding..."
      : "Add Movie"
  }
</button>

        </div>

        <div className="genre-filters">

  {genres.map((genre) => (

    <button
      key={genre}

      className={`
        genre-pill
        ${
          selectedGenre === genre
            ? "active-genre"
            : ""
        }
      `}

      onClick={() =>
        setSelectedGenre(genre)
      }
    >

      {genre}

    </button>

  ))}

</div>


        <div className="recent-section">

  <h2>
    🕒 Recently Added
  </h2>

  <div className="recent-grid">

    {recentMovies.map((movie) => (

      <div
        key={movie.id}

        className="recent-card"

        onClick={() =>
          setSelectedMovie(movie)
        }
      >

        <img
          src={movie.poster}

          alt={movie.name}
        />

        <p>
          {movie.name}
        </p>

      </div>

    ))}

  </div>

</div>

        {movies.length === 0 ? (

          <p className="empty-message">
            🎬 No movies added yet.
          </p>

        ) : (

          <>

            {favoriteMovies.length > 0 && (

              <>

               <div className="section-header">

  <h2 id="top-picks">
    ⭐ Top Picks
  </h2>

  <Link
    to="/top-picks"
    className="view-all-link"
  >
    View All →
  </Link>

</div>

                <ul>

                  {favoritePreview.map((movie) => (

                    <MovieCard
                      key={movie.id}

                      name={movie.name}

                      rating={movie.rating}

                      watched={movie.watched}

                      favorite={movie.favorite}

                      year={movie.year}

                      genre={movie.genre}

                      poster={movie.poster}

                      note={movie.note}

                      deleteMovie={() =>
                        deleteMovie(movie.id)
                      }

                      toggleWatched={() =>
                        toggleWatched(movie.id)
                      }

                      toggleFavorite={() =>
                        toggleFavorite(movie.id)
                      }

                      openMovie={() =>
                        setSelectedMovie(movie)
                      }
                    />

                  ))}

                </ul>
    

              </>

            )}

            <div className="section-header">

  <h2 id="watchlist">
    🎞 Watchlist
  </h2>

  <Link
    to="/watchlist"
    className="view-all-link"
  >
    View All →
  </Link>

</div>

            <ul>

              {watchlistPreview.map((movie) => (

                <MovieCard
                  key={movie.id}

                  name={movie.name}

                  rating={movie.rating}

                  watched={movie.watched}

                  favorite={movie.favorite}

                  year={movie.year}

                  genre={movie.genre}

                  poster={movie.poster}

                  note={movie.note}

                  deleteMovie={() =>
                    deleteMovie(movie.id)
                  }

                  toggleWatched={() =>
                    toggleWatched(movie.id)
                  }

                  toggleFavorite={() =>
                    toggleFavorite(movie.id)
                  }

                  openMovie={() =>
                    setSelectedMovie(movie)
                  }
                />

              ))}

            </ul>
  

           <div className="section-header">

  <h2 id="watched">
    ✅ Watched
  </h2>

  <Link
    to="/watched"
    className="view-all-link"
  >
    View All →
  </Link>

</div>

            <ul>

              {watchedPreview.map((movie) => (
                <MovieCard
                  key={movie.id}

                  name={movie.name}

                  rating={movie.rating}

                  watched={movie.watched}

                  favorite={movie.favorite}

                  year={movie.year}

                  genre={movie.genre}

                  poster={movie.poster}

                  note={movie.note}

                  deleteMovie={() =>
                    deleteMovie(movie.id)
                  }

                  toggleWatched={() =>
                    toggleWatched(movie.id)
                  }

                  toggleFavorite={() =>
                    toggleFavorite(movie.id)
                  }

                  openMovie={() =>
                    setSelectedMovie(movie)
                  }
                />

              ))}

            </ul>
 

          </>

        )}

       <MovieModal
  movie={
    movies.find(
      (movie) =>
        movie.id === selectedMovie?.id
    )
  }

  closeModal={() =>
    setSelectedMovie(null)
  }

  toggleWatched={() =>
    toggleWatched(selectedMovie.id)
  }

  toggleFavorite={() =>
    toggleFavorite(selectedMovie.id)
  }
/>

      </main>

        </div>

      }
    />

   <Route
  path="/insights"

  element={
      <Insights

        averageRating={
          averageRating
        }

        favoriteGenre={
          favoriteGenre
        }

        highestRatedMovie={
          highestRatedMovie
        }

        watchlistMovies={
          watchlistMovies
        }

        movies={movies}

      />

      
    }
/>
<Route
  path="/watchlist"
  element={
    <Watchlist
      watchlistMovies={watchlistMovies}
      deleteMovie={deleteMovie}
      toggleWatched={toggleWatched}
      toggleFavorite={toggleFavorite}
      setSelectedMovie={setSelectedMovie}
      selectedMovie={selectedMovie}
      sortType={sortType}
      setSortType={setSortType}
    />
  }
/>

<Route
  path="/top-picks"
  element={
    <TopPicks
      favoriteMovies={favoriteMovies}
      deleteMovie={deleteMovie}
      toggleWatched={toggleWatched}
      toggleFavorite={toggleFavorite}
      setSelectedMovie={setSelectedMovie}
      selectedMovie={selectedMovie}
      sortType={sortType}
      setSortType={setSortType}
    />
  }
/>

<Route
  path="/watched"
  element={
    <Watched
      watchedMovies={watchedMovies}
      deleteMovie={deleteMovie}
      toggleWatched={toggleWatched}
      toggleFavorite={toggleFavorite}
      setSelectedMovie={setSelectedMovie}
      selectedMovie={selectedMovie}
      sortType={sortType}
      setSortType={setSortType}
    />
  }
/>

<Route
  path="/test-home"
  element={<Home />}
/>



  </Routes>
  </>

  );

}

export default App;