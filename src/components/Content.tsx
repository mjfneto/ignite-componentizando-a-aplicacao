import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import { GenreResponseProps, MovieProps } from "../App";
import { api } from '../services/api';

import '../styles/content.scss';

export function Content() {
  const { genreName } = useParams();

  const [selectedGenre, setSelectedGenre] = useState({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useLayoutEffect(() => {
    api.get<GenreResponseProps[]>(`genres/?name=${genreName}`).then(response => {
      setSelectedGenre(response.data[0]);
    })
  } , [genreName]);

  useLayoutEffect(() => {
    if (Object.keys(selectedGenre).length > 0) {
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
        setMovies(response.data);
      })
    }
  }, [selectedGenre])

  return (selectedGenre &&
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} selectedGenre={selectedGenre.title} id={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}