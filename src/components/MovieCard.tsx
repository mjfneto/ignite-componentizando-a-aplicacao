import { Link, useParams } from 'react-router-dom';
import { Star, Clock } from 'react-feather';

import '../styles/movie-card.scss';

interface MovieCardProps {
  selectedGenre: string;
  id: string;
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}

export function MovieCard(props: MovieCardProps) {
  const { genreName } = useParams();

  return (
    <Link to={`/${genreName}/${props.id}`} state={{ category: props.selectedGenre }}>
      <div className="movie-card">
        <img
          src={props.poster}
          alt={props.title}
        />

        <div>
          <div className="movie-info">
            <span>{props.title}</span>
            <div className="meta">
              <div>
                <Star /> {props.rating}
              </div>

              <div>
                <Clock /> {props.runtime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}