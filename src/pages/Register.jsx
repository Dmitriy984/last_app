import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Заполните все поля'); return; }
    const ok = register(form.name, form.email, form.password);
    if (!ok) setError('Пользователь с таким email уже существует');
    else navigate('/');
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl p-8" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)'}}>
        <h2 className="text-2xl font-bold mb-1 text-white">Создать аккаунт</h2>
        <p className="text-gray-400 text-sm mb-6">Присоединяйтесь к CineVault</p>
        {error && <div className="bg-red-500/20 text-red-300 text-sm rounded-xl px-4 py-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Имя" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none" />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none" />
          <input type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white focus:border-purple-400 outline-none" />
          <button type="submit" className="w-full rounded-xl py-3 font-semibold text-white" style={{background: 'linear-gradient(135deg, #6c47ff, #a855f7)'}}>Зарегистрироваться</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">Уже есть аккаунт? <Link to="/login" className="text-purple-400 hover:underline">Войти</Link></p>
      </div>
    </div>
  );
}
