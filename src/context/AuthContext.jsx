import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cinevault_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('cinevault_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return false;
    setUser(found);
    localStorage.setItem('cinevault_user', JSON.stringify(found));
    return true;
  }, []);

  const register = useCallback((name, email, password) => {
    const users = JSON.parse(localStorage.getItem('cinevault_users') || '[]');
    if (users.find(u => u.email === email)) return false;
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('cinevault_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('cinevault_user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('cinevault_user');
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('cinevault_user', JSON.stringify(updated));
    const users = JSON.parse(localStorage.getItem('cinevault_users') || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = updated;
      localStorage.setItem('cinevault_users', JSON.stringify(users));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
