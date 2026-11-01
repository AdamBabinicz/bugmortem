'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Przewiń do góry"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200/80 bg-white/90 text-neutral-700 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white dark:shadow-rose-950/30"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
