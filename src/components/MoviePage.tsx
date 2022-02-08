import { useState, useLayoutEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom"
import { ChevronLeft } from "react-feather";
import { MovieProps } from '../App'
import { api } from "../services/api";

import '../styles/movie-page.scss';

interface MoviePageMovie extends MovieProps {
   Year: string; 
   Released: string;
   Director: string;
   Actors: string;
   Plot: string;
};

type LocationStateType = {
    category: string;
}

export function MoviePage() {
    const [movie, setMovie] =useState<MoviePageMovie>({} as MoviePageMovie);
    const { genreName, imdbId } = useParams();
    const location = useLocation();
    const LocationState = location.state as LocationStateType;

    useLayoutEffect(() => {
        api.get<MoviePageMovie[]>(`movies/?imdbID=${imdbId}`).then(response => {
            setMovie(response.data[0]);
        })
    }, []);

    return (
        <div className="container">
            <div className="breadcrumb">
                <Link to={`/${genreName}`}>
                    <ChevronLeft size='2.25rem' />{LocationState.category}
                </Link>
            </div>
            {Object.keys(movie).length > 0 && (
                <div className="flex space-between movie-wrapper">
                    <div className="flex poster-wrapper">
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="info">
                        <h1>{movie.Title} ({movie.Year})</h1>
                        <h2>Avaliações</h2>
                        {movie.Ratings?.map(({ Source, Value }) => (<p key={Source.toLowerCase()}>{Source}: <strong>{Value}</strong></p>))}
                        <h2>Direção</h2>
                        <p>{movie.Director}</p>
                        <h2>Elenco</h2>
                        <p>{movie.Actors}</p>
                        <h2>Sinopse</h2>
                        <p>{movie.Plot}</p>
                    </div>
                </div>
            )}
        </div>
    );
}