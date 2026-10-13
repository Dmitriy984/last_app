import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/catalog?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0b0d15]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="text-2xl">🎬</span>
          <span style={{background: 'linear-gradient(135deg, #c084fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>CineVault</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-purple-400 transition">Главная</Link>
          <Link to="/catalog" className="hover:text-purple-400 transition">Каталог</Link>
          {user && <Link to="/profile" className="hover:text-purple-400 transition">Профиль</Link>}
        </div>
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..." 
              className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white w-36 lg:w-48 focus:border-purple-400" />
          </form>
          {user ? (
            <div className="relative">
              <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-sm hover:bg-white/20 transition">
                <span className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">{user.name.charAt(0).toUpperCase()}</span>
                <span className="hidden sm:inline text-white">{user.name}</span>
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0b0d15]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-white/10 text-sm text-white" onClick={() => setMenu(false)}>Мой профиль</Link>
                  <hr className="border-white/10 my-1" />
                  <button onClick={() => { logout(); setMenu(false); navigate('/'); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10">Выйти</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white">Войти</Link>
              <Link to="/register" className="text-sm font-medium px-4 py-1.5 rounded-full" style={{background: 'linear-gradient(135deg, #6c47ff, #a855f7)', color: 'white'}}>Регистрация</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
