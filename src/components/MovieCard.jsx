import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ movie }) {
  const { user } = useAuth();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer block"
    >
      {/* Обложка */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Если изображение не загрузится, будет тёмный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-purple-900 opacity-40"></div>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Тёмный градиент снизу при наведении */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Бейджи жанров */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map(g => (
            <span key={g} className="badge text-[10px] font-semibold bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
              {g}
            </span>
          ))}
        </div>

        {/* Рейтинг */}
        <div className="absolute bottom-3 right-3 rating text-xs bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
          ★ {movie.rating}
        </div>

        {/* Индикатор избранного (только для авторизованных) */}
        {user && (
          <button
            onClick={(e) => {
              e.preventDefault(); // не переходить по ссылке
              toggleWatchlist(movie.id);
            }}
            className={`absolute top-3 right-3 fav-btn text-lg transition-all duration-200 ${
              inList ? 'active' : ''
            }`}
          >
            {inList ? '💜' : '🤍'}
          </button>
        )}
      </div>

      {/* Нижняя часть с информацией */}
      <div className="card-info p-3">
        <h3 className="font-semibold text-sm leading-tight text-white group-hover:text-purple-300 transition-colors duration-200">
          {movie.title}
        </h3>
        <div className="meta flex items-center gap-2 mt-1 text-xs text-gray-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
      </div>

      {/* Ripple-эффект при клике (опционально) */}
      <span className="ripple absolute inset-0 pointer-events-none opacity-0 group-active:opacity-100"></span>
    </Link>
  );
}
