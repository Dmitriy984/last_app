import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ movie, compact }) {
  const { user } = useAuth();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id);

  return (
    <div className="rounded-2xl overflow-hidden" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition"></div>
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
            {movie.genre.slice(0,2).map(g => (
              <span key={g} className="text-[10px] font-semibold bg-black/50 backdrop-blur rounded-full px-2 py-0.5">{g}</span>
            ))}
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 hover:opacity-100 transition">
            <span className="bg-black/60 backdrop-blur rounded-full px-2 py-0.5 text-xs text-white">★ {movie.rating}</span>
          </div>
        </div>
      </Link>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/movie/${movie.id}`} className="font-semibold text-sm leading-tight hover:text-purple-300 transition text-white">{movie.title}</Link>
          {user && (
            <button onClick={() => toggleWatchlist(movie.id)} className="shrink-0 text-lg transition hover:scale-110">{inList ? '💜' : '🤍'}</button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
      </div>
    </div>
  );
}
