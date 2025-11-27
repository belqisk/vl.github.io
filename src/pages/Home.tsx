
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "motion/react";
import { PlayCircle, TrendingUp, Star, List } from 'lucide-react';
import { WordbookModule } from '../components/WordbookModule';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24">
      
      {/* Welcome Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-8 px-6 max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
          I’m Learning <br/> <span className="text-orange-500">Words</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md">
          Simple and smooth vocabulary experience. Keep your streak alive.
        </p>
      </motion.section>

      {/* Statistics Module */}
      <section className="px-6 max-w-5xl mx-auto mb-10">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
           <div className="text-center">
             <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Total</p>
             <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">1,240</p>
           </div>
           <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800"></div>
           <div className="text-center">
             <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Learned</p>
             <p className="text-3xl font-bold text-orange-500">856</p>
           </div>
           <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800"></div>
           <div className="text-center">
             <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Streak</p>
             <p className="text-3xl font-bold text-yellow-500">12<span className="text-sm text-zinc-400 font-normal ml-1">days</span></p>
           </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 max-w-5xl mx-auto mb-10">
        <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Start Learning</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/words" className="group">
            <div className="bg-orange-500 hover:bg-orange-600 transition-colors rounded-xl p-6 text-white flex items-center justify-between shadow-lg shadow-orange-500/20">
              <div>
                <h4 className="font-bold text-lg">Continue Learning</h4>
                <p className="text-orange-100 text-sm">Pick up where you left off</p>
              </div>
              <PlayCircle size={32} className="opacity-80 group-hover:scale-110 transition-transform"/>
            </div>
          </Link>

          <div className="grid grid-cols-3 gap-2">
            <button className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center p-2 transition-all">
              <TrendingUp size={20} className="mb-1 text-blue-500"/>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Hard</span>
            </button>
            <button className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center p-2 transition-all">
              <Star size={20} className="mb-1 text-yellow-500"/>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Favs</span>
            </button>
            <button className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center p-2 transition-all">
              <List size={20} className="mb-1 text-purple-500"/>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">New</span>
            </button>
          </div>
        </div>
      </section>

      {/* Wordbooks */}
      <div className="px-6 max-w-5xl mx-auto">
        <WordbookModule />
      </div>

    </div>
  );
};
