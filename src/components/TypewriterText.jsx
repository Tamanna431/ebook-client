'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultWords = [
  'Original Ebooks',
  'Bestselling Stories',
  'World-Class Novels',
  'Creative Masterpieces',
  'Knowledge & Ideas',
];

export default function TypewriterText({ words = defaultWords, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        } else {
          // Finished typing word, wait before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        } else {
          // Finished deleting, switch to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent transition-all duration-300">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="ml-1 inline-block w-[3px] h-[0.9em] bg-gradient-to-b from-violet-400 to-cyan-400 rounded-sm shadow-sm shadow-cyan-400/50"
      />
    </span>
  );
}
