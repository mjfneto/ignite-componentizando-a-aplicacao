import { Link, useParams } from "react-router-dom";
import { GenreResponseProps } from "../App";

import { Button } from './Button';

import '../styles/sidebar.scss';

type SideBarProps = {
  genres: GenreResponseProps[];
}

export function SideBar({ genres }: SideBarProps) {
  const { genreId } = useParams();

  return (
    <nav className="sidebar">
      <Link className="watchme-logo-link" to="/">
        <span className="watchme-logo">Watch<p>Me</p></span>
      </Link>
      <div className="buttons-container">
        {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              selected={genreId === genre.id.toString()}
            />
        ))}
      </div>
    </nav>
  );
}