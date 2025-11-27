
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { chevron-left, Moon, Volume2, Save, Download, Upload, Type, Shuffle } from 'lucide-react';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { toast } from 'sonner@2.0.3';
import { motion } from "motion/react";

export const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [randomOrder, setRandomOrder] = useState(false);
  
  // In a real app, this would update a context or localStorage
  const handleThemeChange = (enabled: boolean) => {
    setIsDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 px-4 py-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 -ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-zinc-700 dark:text-zinc-300" />
          </Link>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Settings</h1>
        </div>
        <button 
          onClick={handleSave}
          className="text-orange-500 font-medium hover:text-orange-600 text-sm"
        >
          Done
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        
        {/* Preferences Section */}
        <section>
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 pl-2">Preferences</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            
            <div className="px-4 py-1 flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                <Volume2 size={20} />
              </div>
              <div className="flex-1">
                <ToggleSwitch 
                  label="Auto-pronunciation" 
                  enabled={autoPlay} 
                  onChange={setAutoPlay} 
                />
              </div>
            </div>

            <div className="px-4 py-1 flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                <Shuffle size={20} />
              </div>
              <div className="flex-1">
                <ToggleSwitch 
                  label="Random Order" 
                  enabled={randomOrder} 
                  onChange={setRandomOrder} 
                />
              </div>
            </div>

            <div className="px-4 py-1 flex items-center gap-4">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                <Moon size={20} />
              </div>
              <div className="flex-1">
                <ToggleSwitch 
                  label="Dark Mode" 
                  enabled={isDarkMode} 
                  onChange={handleThemeChange} 
                />
              </div>
            </div>

          </div>
        </section>

        {/* Appearance Section */}
        <section>
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 pl-2">Appearance</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-4">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                  <Type size={20} />
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Font Size</span>
             </div>
             <div className="flex items-center gap-4 px-2">
                <span className="text-xs text-zinc-400">A</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="text-xl text-zinc-400">A</span>
             </div>
          </div>
        </section>

        {/* Data Section */}
        <section>
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 pl-2">Data Management</h2>
          <div className="grid grid-cols-2 gap-4">
             <motion.button 
               whileTap={{ scale: 0.98 }}
               className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm gap-2 hover:border-orange-400 transition-colors"
               onClick={() => toast("Downloading data...")}
             >
                <Download size={24} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Export CSV</span>
             </motion.button>
             
             <motion.button 
               whileTap={{ scale: 0.98 }}
               className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm gap-2 hover:border-orange-400 transition-colors"
               onClick={() => toast("Upload feature would open file picker")}
             >
                <Upload size={24} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Import Data</span>
             </motion.button>
          </div>
        </section>

        <div className="pt-8 text-center">
          <button className="text-red-500 text-sm font-medium hover:text-red-600">
            Reset All Progress
          </button>
        </div>

      </main>
    </div>
  );
};
