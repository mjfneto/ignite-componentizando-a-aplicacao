import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { SideBar } from './components/SideBar';

import { api } from './services/api';

import './styles/global.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      const genres = response.data;
      setGenres(genres);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres={genres} />
      <Outlet />
    </div>
  )
}