
import React from 'react';
import { motion } from "motion/react";
import { Plus, Book } from 'lucide-react';

/**
 * WordbookModule Component
 * 
 * Purpose: Displays grid of wordbooks or vocabulary lists on the home page.
 * Responsive: 3 columns on mobile, 5 on desktop.
 */
export const WordbookModule: React.FC = () => {
  const books = [
    { id: 1, title: "Core 100", count: 100, color: "bg-orange-100 text-orange-600" },
    { id: 2, title: "Business", count: 450, color: "bg-blue-100 text-blue-600" },
    { id: 3, title: "Travel", count: 80, color: "bg-green-100 text-green-600" },
    { id: 4, title: "Daily Life", count: 200, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <section className="py-8">
      <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Your Wordbooks</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <motion.div 
            key={book.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="aspect-[4/5] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-full ${book.color} flex items-center justify-center mb-2`}>
              <Book size={18} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200">{book.title}</h4>
              <p className="text-xs text-zinc-500">{book.count} words</p>
            </div>
          </motion.div>
        ))}

        {/* Add New Placeholder */}
        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="aspect-[4/5] border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center text-zinc-400 cursor-pointer hover:border-orange-400 hover:text-orange-500 transition-colors"
        >
          <Plus size={32} />
          <span className="text-sm font-medium mt-2">Add New</span>
        </motion.div>
      </div>
    </section>
  );
};
