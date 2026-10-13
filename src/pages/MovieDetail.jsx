import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { MOVIES } from '../data/movies';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = MOVIES.find(m => m.id === Number(id));
  const { user } = useAuth();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!movie) {
    return <div className="min-h-screen pt-16 flex items-center justify-center"><p className="text-xl text-white">Фильм не найден</p></div>;
  }
  const inList = isInWatchlist(movie.id);

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[300px] sm:h-[450px] overflow-hidden">
        <img src={movie.backdrop} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d15] via-[#0b0d15]/50 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-48 sm:w-64 shrink-0">
            <img src={movie.poster} alt={movie.title} className="rounded-2xl shadow-2xl w-full aspect-[2/3] object-cover" />
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
              <span>{movie.year}</span><span>•</span><span>{movie.duration}</span><span>•</span><span className="text-yellow-400">★ {movie.rating}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map(g => <span key={g} className="bg-white/10 rounded-full px-3 py-1 text-xs font-medium text-white">{g}</span>)}
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">{movie.description}</p>
            <div className="text-sm text-gray-400 mb-6 space-y-1">
              <p><span className="text-gray-500">Режиссёр: </span>{movie.director}</p>
              <p><span className="text-gray-500">В ролях: </span>{movie.cast.join(', ')}</p>
            </div>
            {user && (
              <button onClick={() => toggleWatchlist(movie.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${inList ? 'bg-purple-600 text-white' : ''}`}
                style={inList ? {} : {background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>
                {inList ? ' В избранном' : ' В избранное'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
