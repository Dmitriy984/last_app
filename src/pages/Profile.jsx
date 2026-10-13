import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { MOVIES } from '../data/movies';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { watchlist, toggleWatchlist } = useWatchlist();
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);
  const favMovies = MOVIES.filter(m => watchlist.includes(m.id));

  const handleSave = () => {
    if (name.trim()) {
      updateProfile({ name: name.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white">{user?.name?.charAt(0).toUpperCase()}</div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm text-gray-400 block mb-1">Имя</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none" />
            <button onClick={handleSave} className="px-6 py-2.5 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #6c47ff, #a855f7)'}}>
              {saved ? '✅ Сохранено' : 'Сохранить'}
            </button>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">💜 Избранное {favMovies.length > 0 && `(${favMovies.length})`}</h3>
        {favMovies.length === 0 ? (
          <div className="rounded-2xl p-10 text-center text-gray-500" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>
            <p className="text-lg">Здесь пока пусто</p>
            <Link to="/catalog" className="text-purple-400 hover:underline mt-2 inline-block">Искать фильмы</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favMovies.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
