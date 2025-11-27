
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Settings } from 'lucide-react';

/**
 * Header Component
 * 
 * Purpose: Top navigation bar visible on all pages.
 * Interaction: Navigates between Home, Words, and Settings.
 */
export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            V
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
            Vocab<span className="text-orange-500">Master</span>
          </span>
        </div>

        <nav className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full">
          <NavLink 
            to="/" 
            className={({ isActive }) => `p-2 rounded-full transition-all ${isActive ? 'bg-white dark:bg-zinc-800 shadow-sm text-orange-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
          >
            <Home size={20} />
          </NavLink>
          <NavLink 
            to="/words" 
            className={({ isActive }) => `p-2 rounded-full transition-all ${isActive ? 'bg-white dark:bg-zinc-800 shadow-sm text-orange-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
          >
            <BookOpen size={20} />
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `p-2 rounded-full transition-all ${isActive ? 'bg-white dark:bg-zinc-800 shadow-sm text-orange-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
          >
            <Settings size={20} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
