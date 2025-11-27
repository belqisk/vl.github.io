
import React from 'react';
import { motion } from "motion/react";

interface ProgressBarProps {
  current: number;
  total: number;
}

/**
 * ProgressBar Component
 * 
 * Purpose: Visual indicator of learning progress.
 * Styling: Minimalist line with smooth width transition.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full h-2 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-orange-400 to-yellow-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};
