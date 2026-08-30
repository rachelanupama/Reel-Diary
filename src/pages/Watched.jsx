import MovieCard from "../MovieCard";
import Sidebar from "../Sidebar";
import MovieModal from "../MovieModal";
function Watched(props) {

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
        ✅ Watched
      </h1>

      {props.watchedMovies.length === 0 ? (

        <p className="empty-message">
          No watched movies yet.
        </p>

      ) : (

        <ul>

          {props.watchedMovies.map((movie) => (

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

export default Watched;