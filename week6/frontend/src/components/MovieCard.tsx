
import type { Movie } from "../types/Movie.ts";

type MovieCardProps = {
    movie: Movie
}

function MovieCard({ movie } : MovieCardProps) {
    return (
        <div className="movie-card">
            <img src={`http://localhost:3000${movie.image}`} alt="it is a movie image" />
            <div className="movie-details">
                <h3>{ movie.title }</h3>
                <p>{ movie.genre }</p>
                <p>⭐ { movie.rating }</p>
                <p>{ movie.year }</p>
            </div>
        </div>
    )
}

export default MovieCard;
