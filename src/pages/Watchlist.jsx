import MovieCard from "../MovieCard";
import Sidebar from "../Sidebar";
import MovieModal from "../MovieModal";


function Watchlist(props) {

return (

  <div className="layout">

    <Sidebar
  activeSection=""
  setActiveSection={() => {}}
  sortType={props.sortType}
  setSortType={props.setSortType}
/>

    <div className="main-content">

      <h1>
        🎞 Watchlist
      </h1>

      {props.watchlistMovies.length === 0 ? (

        <p className="empty-message">
          Nothing in your watchlist yet.
        </p>

      ) : (

        <ul>

          {props.watchlistMovies.map((movie) => (

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
                props.deleteMovie(movie.id)
              }

              toggleWatched={() =>
                props.toggleWatched(movie.id)
              }

              toggleFavorite={() =>
                props.toggleFavorite(movie.id)
              }

              openMovie={() =>
                props.setSelectedMovie(movie)
              }
            />

          ))}

        </ul>

      )}
      <MovieModal
  movie={props.selectedMovie}

  closeModal={() =>
    props.setSelectedMovie(null)
  }

  toggleWatched={() =>
    props.toggleWatched(
      props.selectedMovie.id
    )
  }

  toggleFavorite={() =>
    props.toggleFavorite(
      props.selectedMovie.id
    )
  }
/>

    </div>
    </div>
    

  );

}

export default Watchlist;