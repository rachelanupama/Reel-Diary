import MovieCard from "../MovieCard";
import MovieModal from "../MovieModal";
import Sidebar from "../Sidebar";

function TopPicks(props) {

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
          ⭐ Top Picks
        </h1>

        {props.favoriteMovies.length === 0 ? (

          <p className="empty-message">
            No Top Picks yet.
          </p>

        ) : (

          <ul>

            {props.favoriteMovies.map((movie) => (

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

export default TopPicks;