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
      className="ivi-card group relative block rounded-xl overflow-hidden transition-all duration-300"
    >
      {/* Постер на всю карточку */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-slate-800 to-purple-900/40">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Затемнение снизу для читаемости текста */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Кнопка "▶ Смотреть" при наведении */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black/50 backdrop-blur-md text-white font-semibold text-sm border border-white/20 group-hover:scale-105 transition-transform">
            ▶ Смотреть
          </span>
        </div>
      </div>

      {/* Плашка с информацией */}
      <div className="absolute inset-x-0 bottom-0 p-4 pb-3 z-10">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-white font-semibold text-sm leading-tight drop-shadow-md">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span className="text-yellow-400">★ {movie.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {movie.genre.slice(0, 2).map(g => (
                <span key={g} className="px-2 py-0.5 text-[10px] font-medium bg-white/10 rounded-full text-gray-300 backdrop-blur-sm">
                  {g}
                </span>
              ))}
            </div>
          </div>
          {/* Кнопка "Перейти" рядом с названием (всегда видна) */}
          <span className="go-btn inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-xs font-medium text-white/80 transition-all group-hover:bg-purple-500/20 group-hover:text-purple-200">
            Перейти →
          </span>
        </div>
      </div>

      {/* Кнопка избранного */}
      {user && (
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWatchlist(movie.id);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-lg transition-all duration-200 ${
            inList ? 'text-purple-400 shadow-lg shadow-purple-500/30' : 'text-white/70 hover:text-purple-300'
          }`}
        >
          {inList ? '💜' : '🤍'}
        </button>
      )}
    </Link>
  );
}
