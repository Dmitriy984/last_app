import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { MOVIES, GENRES } from '../data/movies';

export default function Catalog() {
  const [genre, setGenre] = useState('Все');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Получаем параметры из URL (если перешли с жанра или поиска)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get('genre');
    const q = params.get('q');
    if (g) setGenre(g);
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    let list = MOVIES;
    if (genre !== 'Все') list = list.filter(m => m.genre.includes(genre));
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.genre.some(g => g.toLowerCase().includes(q))
      );
    }
    return list;
  }, [genre, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/catalog?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Каталог</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Поиск по названию..."
              className="rounded-full px-5 py-2 w-64 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none"
            />
            <button type="submit" className="rounded-full px-5 py-2 text-sm font-semibold text-white" style={{background: 'linear-gradient(135deg, #6c47ff, #a855f7)'}}>Найти</button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {GENRES.map(g => (
            <button 
              key={g} 
              onClick={() => { setGenre(g); setQuery(''); navigate('/catalog'); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${genre === g ? 'text-white' : ''}`}
              style={genre === g ? {background: 'linear-gradient(135deg, #6c47ff, #a855f7)'} : {background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}
            >
              {g}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">😕 Ничего не найдено</p>
            <p className="mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
