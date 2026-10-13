import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Заполните все поля'); return; }
    const ok = login(form.email, form.password);
    if (!ok) setError('Неверный email или пароль');
    else navigate('/');
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl p-8" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>
        <h2 className="text-2xl font-bold mb-1 text-white">Войти</h2>
        <p className="text-gray-400 text-sm mb-6">Добро пожаловать обратно</p>
        {error && <div className="bg-red-500/20 text-red-300 text-sm rounded-xl px-4 py-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none" />
          <input type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none" />
          <button type="submit" className="w-full rounded-xl py-3 font-semibold text-white" style={{background: 'linear-gradient(135deg, #6c47ff, #a855f7)'}}>Войти</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">Нет аккаунта? <Link to="/register" className="text-purple-400 hover:underline">Зарегистрироваться</Link></p>
      </div>
    </div>
  );
}
