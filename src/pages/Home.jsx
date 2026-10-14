import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { MOVIES, GENRES } from '../data/movies';

export default function Home() {
  const { user } = useAuth();
  const { watchlist } = useWatchlist();
  const trending = [...MOVIES].sort((a,b) => b.rating - a.rating).slice(0,6);
  const favMovies = MOVIES.filter(m => watchlist.includes(m.id));

  return (
    <div className="min-h-screen pt-16" style={{background: 'radial-gradient(ellipse at 30% 20%, rgba(108,71,255,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.15) 0%, transparent 50%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative rounded-3xl overflow-hidden mb-12 min-h-[300px] sm:min-h-[400px] flex items-end" style={{background: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop) center/cover'}}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d15] via-[#0b0d15]/70 to-transparent"></div>
          <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-3 text-white">Добро пожаловать в <span style={{background: 'linear-gradient(135deg, #c084fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>CineVault</span></h1>
            <p className="text-gray-300 text-base sm:text-lg mb-6">Смотрите лучшие фильмы. Составляйте коллекции. Без рекламы и без покупок. Только кино.</p>
            <Link to="/catalog" className="inline-block px-8 py-3 rounded-full font-semibold text-white" style={{background: 'linear-gradient(135deg, #6c47ff, #a855f7)'}}>Начать смотреть</Link>
          </div>
        </div>
        {user && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">🎯 Ваше избранное</h2>
            {favMovies.length === 0 ? (
              <p className="text-gray-500 text-sm">Добавьте фильмы в избранное, чтобы они появились здесь.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {favMovies.slice(0,4).map(m => <MovieCard key={m.id} movie={m} />)}
              </div>
            )}
          </div>
        )}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">🔥 Лучшие рейтинги</h2>
         <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {trending.map(m => <MovieCard key={m.id} movie={m} />)}
</div>

        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">🎭 Жанры</h2>
          <div className="flex flex-wrap gap-3">
            {GENRES.filter(g => g !== 'Все').map(g => (
              <Link key={g} to={`/catalog?genre=${g}`} className="rounded-xl px-6 py-3 font-medium hover:border-purple-500/40 transition" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>{g}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
