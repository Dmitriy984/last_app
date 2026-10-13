import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export function useWatchlist() {
  return useContext(WatchlistContext);
}

export default function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState(() => {
    if (!user) return [];
    const data = localStorage.getItem(`cinevault_watchlist_${user.id}`);
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cinevault_watchlist_${user.id}`, JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const toggleWatchlist = useCallback((movieId) => {
    setWatchlist(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  }, []);

  const isInWatchlist = useCallback((movieId) => watchlist.includes(movieId), [watchlist]);

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}
