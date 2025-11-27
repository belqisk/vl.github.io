
import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
import { Volume2, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface Word {
  id: number;
  en: string;
  cn: string;
  example?: string;
  difficulty: number; // 1-5
  learned: boolean;
  favorite: boolean;
}

interface WordCardProps {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  onToggleFavorite: (id: number) => void;
  onToggleLearned: (id: number) => void;
  autoPlayAudio?: boolean;
}

/**
 * WordCard Component
 * 
 * Purpose: The main interactive element for learning words.
 * Features: 
 * - Swipe gestures (Left/Right)
 * - Tilt effect based on drag position
 * - Audio pronunciation
 * - Flip/Expand logic (simplified here to just show content)
 */
export const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onNext, 
  onPrev, 
  onToggleFavorite, 
  onToggleLearned,
  autoPlayAudio = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for drag interactions
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const bg = useTransform(x, [-200, 0, 200], ["rgba(239, 68, 68, 0.1)", "rgba(255,255,255,0)", "rgba(34, 197, 94, 0.1)"]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onPrev();
    } else if (info.offset.x < -100) {
      onNext();
    }
  };

  const playAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.en);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  React.useEffect(() => {
    if (autoPlayAudio) playAudio();
  }, [word.id, autoPlayAudio]);

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] px-15 sm:px-20 lg:px-0 perspective-1000">
      <motion.div
        style={{ x, rotate, opacity, backgroundColor: bg }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 w-full h-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-8 cursor-grab active:cursor-grabbing overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Decorative background blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-6 w-full">
          
          {/* Main Word */}
          <div className="space-y-2">
             <motion.h2 
               className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"
               layoutId={`word-${word.id}`}
             >
               {word.en}
             </motion.h2>
             <p className="text-2xl text-zinc-500 dark:text-zinc-400 font-light">{word.cn}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={playAudio}
              className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-100 dark:hover:bg-orange-900/20 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-colors"
              aria-label="Pronounce"
            >
              <Volume2 size={24} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(word.id); }}
              className={`p-3 rounded-full transition-colors ${word.favorite ? 'bg-yellow-100 text-yellow-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}
            >
              <Star size={24} fill={word.favorite ? "currentColor" : "none"} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onToggleLearned(word.id); }}
              className={`p-3 rounded-full transition-colors ${word.learned ? 'bg-green-100 text-green-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}
            >
              <Check size={24} />
            </button>
          </div>
        </div>
        
        {/* Hint for Swipe */}
        <div className="absolute bottom-6 flex justify-between w-full px-8 text-zinc-300 text-sm font-medium pointer-events-none opacity-50">
          <span className="flex items-center gap-1"><ChevronLeft size={14}/> Prev</span>
          <span className="flex items-center gap-1">Next <ChevronRight size={14}/></span>
        </div>
      </motion.div>
      
      {/* Stack Effect (Cards behind) */}
      <div className="absolute top-4 left-0 right-0 h-full bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 -z-10 scale-[0.95] opacity-50 translate-y-2" />
      <div className="absolute top-8 left-0 right-0 h-full bg-white dark:bg-zinc-900 rounded-3xl shadow border border-zinc-200 dark:border-zinc-800 -z-20 scale-[0.9] opacity-25 translate-y-4" />
    </div>
  );
};
