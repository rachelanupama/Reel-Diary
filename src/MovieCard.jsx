function MovieCard(props) {
  console.log(props);

  return (

    <li
      className={`
        movie-card
        ${props.favorite ? "favorite-card" : ""}
      `}
      onClick={props.openMovie}
    >

      {props.poster && (

        <img
          src={props.poster}
          alt={props.name}
        />

      )}

      <div className="movie-info">

        <h3>{props.name}</h3>

        <p className="movie-year">
          {props.year}
        </p>

        <div className="genre-container">

  {props.genre
    ?.split(", ")
    .map((g) => (

      <span
        key={g}
        className="genre-badge"
      >
        {g}
      </span>

    ))}

</div>

        {props.note && (
          <p className="movie-memory">
            “{props.note}”
          </p>
          )}
        <p className="movie-rating">
          {
              props.rating === 5
                ? "❤️❤️❤️❤️❤️"
              : props.rating === 4
              ? "❤️❤️❤️❤️"
              : props.rating === 3
              ? "❤️❤️❤️"
              : props.rating === 2
              ? "💔💔"
              : props.rating === 1
              ? "💔"
              : ""
          }
        </p>

        <div className="buttons">

          <button
            onClick={(e) => {

              e.stopPropagation();

              props.toggleWatched();

            }}
          >

            {props.watched
              ? "✅ Watched"
              : "🎞 Watchlist"}

          </button>

          <button
            onClick={(e) => {

              e.stopPropagation();

              props.toggleFavorite();

            }}
          >

            {props.favorite
              ? "⭐ Top Pick"
              : "☆ Favorite"}

          </button>

          <button
            onClick={(e) => {

              e.stopPropagation();

              props.deleteMovie();

            }}
          >

            🗑 Delete

          </button>

        </div>

      </div>

    </li>

  );
}

export default MovieCard;