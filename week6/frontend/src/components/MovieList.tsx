
import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    async function loadMovies() {
      const response = await fetch("http://localhost:3000/movies");
      const data: Movie[] = await response.json();
      setMovies(data);
    }

    loadMovies();
  }, []);

  let visibleMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (selectedGenre !== "All") {
    visibleMovies = visibleMovies.filter(
      movie => movie.genre === selectedGenre
    );
  }

  if (sortOrder === "rating") {
    visibleMovies = [...visibleMovies].sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sortOrder === "year") {
    visibleMovies = [...visibleMovies].sort(
      (a, b) => b.year - a.year
    );
  }

  return (
    <>
      <div className="controls">
        <input
          placeholder="Search movie"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <select
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Crime">Crime</option>
          <option value="Romance">Romance</option>
        </select>

        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="none">Default</option>
          <option value="rating">Sort by Rating</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      <div className="movie-grid">
        {visibleMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default MovieList;
