import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { render } from 'react-dom'

import { App } from './App'
import { Content } from './components/Content';
import { MoviePage } from './components/MoviePage';
import IndexPage from './components/IndexPage';

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<IndexPage />} />
                <Route path=":genreName" element={<Content />} />
                <Route path=":genreName/:imdbId" element={<MoviePage />} />
                <Route path="*" element={<Link to="/" style={{
                    display: 'inline-block',
                    margin: '1rem'
                }}>Página inicial</Link>} />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);