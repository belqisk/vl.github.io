
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Settings2 } from 'lucide-react';
import { WordCard, Word } from '../components/WordCard';
import { ProgressBar } from '../components/ProgressBar';
import { toast } from 'sonner@2.0.3';

// Mock Data
const INITIAL_WORDS: Word[] = [
  { id: 1, en: "fundamental", cn: "adj. 基本的；根本的 词汇变体：fundamentally (adv.), fundament (n.) 词汇分类：教育 / 科学 ｜ ★★★ 同义替换：essential / basic / core", difficulty: 4, learned: false, favorite: true },
  { id: 2, en: "access", cn: "n./v. 进入；使用 词汇变体：accessible (adj.), accessibility (n.) 词汇分类：教育 / 科技 ｜ ★★★ 同义替换：entry / approach / availability", difficulty: 3, learned: false, favorite: false },
  { id: 3, en: "heyday", cn: "n. 全盛期 词汇变体：— 词汇分类：历史 / 经济 ｜ ★★★ 同义替换：peak period / prime / golden age", difficulty: 5, learned: false, favorite: true },
  { id: 4, en: "leisure", cn: "n. 休闲；闲暇 词汇变体：leisurely (adj./adv.) 词汇分类：生活方式 / 社会 ｜ ★★★ 同义替换：free time / recreation / pastime", difficulty: 5, learned: false, favorite: false },
  { id: 5, en: "comprise", cn: "v. 包含；由…组成 词汇变体：comprising (adj.), comprised (adj.) 词汇分类：科研 / 数据 ｜ ★★★ 同义替换：consist of / be made up of / include", difficulty: 4, learned: false, favorite: false },
];

export const Vocabulary: React.FC = () => {
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left/prev, 1 for right/next

  const currentWord = words[currentIndex];

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      toast.success("You've reached the end of the list!");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleFavorite = (id: number) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, favorite: !w.favorite } : w));
    const isFav = !words.find(w => w.id === id)?.favorite;
    toast(isFav ? "Added to Favorites" : "Removed from Favorites", {
      icon: isFav ? "⭐" : "🗑️",
    });
  };

  const toggleLearned = (id: number) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, learned: !w.learned } : w));
    const isLearned = !words.find(w => w.id === id)?.learned;
    if (isLearned) {
      toast.success("Marked as Learned!");
      // Auto advance on learned could be a setting
      setTimeout(handleNext, 500);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      
      {/* Header for Vocab Page */}
      <header className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto w-full z-20">
        <Link to="/" className="p-2 -ml-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-zinc-700 dark:text-zinc-300" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Reviewing</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Daily Mix</span>
        </div>
        <Link to="/settings" className="p-2 -mr-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <Settings2 size={24} className="text-zinc-700 dark:text-zinc-300" />
        </Link>
      </header>

      {/* Progress */}
      <div className="px-8 max-w-md mx-auto w-full mb-8">
        <ProgressBar current={currentIndex + 1} total={words.length} />
        <div className="flex justify-between mt-2 text-xs text-zinc-400 font-mono">
          <span>{currentIndex + 1}</span>
          <span>{words.length}</span>
        </div>
      </div>

      {/* Main Card Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 relative overflow-hidden">
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="w-full flex justify-center"
          >
            <WordCard 
              word={currentWord} 
              onNext={handleNext}
              onPrev={handlePrev}
              onToggleFavorite={toggleFavorite}
              onToggleLearned={toggleLearned}
            />
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
};
