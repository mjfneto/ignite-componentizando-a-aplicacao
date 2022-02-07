import { GenreResponseProps } from "../App";

import { Button } from './Button';

type SideBarProps = {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  onButtonClick: (id: number) => void;
}

export function SideBar({ genres, selectedGenreId, onButtonClick }: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onButtonClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}