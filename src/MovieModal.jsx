function MovieModal(props) {

  if (!props.movie) return null;

  return (

    <div
      className="modal-overlay"
      onClick={props.closeModal}
    >

      <div
        className="movie-modal"

                style={{
        background:
            `
            radial-gradient(
            circle at top left,
            rgba(60,70,110,0.35),
            transparent 35%
            ),

            radial-gradient(
            circle at bottom right,
            rgba(120,40,70,0.28),
            transparent 40%
            ),

            linear-gradient(
            135deg,
            #232833,
            #171b22
            )
            `
}}

        onClick={(e) => e.stopPropagation()}
      >
<div className="modal-buttons">
        <button
          className="close-btn"
          onClick={props.closeModal}
        >
          ✕
        </button>

        <img
          src={props.movie.poster}
          alt={props.movie.name}
        />

        <div className="modal-info">

          <h2>{props.movie.name}</h2>

          <p>{props.movie.year}</p>

          <p>{props.movie.genre}</p>

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

          <p>{props.movie.plot}</p>

          <p>🎭 {props.movie.actors}</p>

          <p>⏱ {props.movie.runtime}</p>

          <div className="modal-buttons">

            <button 
            className="add-movie-btn"
            onClick={props.toggleWatched}>

              {props.movie.watched
                ? "✅ Watched"
                : "🎞 Watchlist"}

            </button>

            <button 
            className="add-movie-btn"
            onClick={props.toggleFavorite}>
                

              {props.movie.favorite
                ? "⭐ Top Pick"
                : "☆ Favorite"}

            </button>

            <button
            className="add-movie-btn"
              onClick={() => {

                window.open(
                  `https://www.youtube.com/results?search_query=${props.movie.name}+trailer`,
                  "_blank"
                );

              }}
            >
              ▶ Trailer
            </button>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default MovieModal;