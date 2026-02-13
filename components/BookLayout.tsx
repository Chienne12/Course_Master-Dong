import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SpreadContent } from '../types';
import { NavButton } from './UI';

interface BookLayoutProps {
  spreads: SpreadContent[];
}

export const BookLayout: React.FC<BookLayoutProps> = ({ spreads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1366,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  useEffect(() => {
    const syncViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });
      setIsMobile(width < 1024);
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const desktopBookStyle = (() => {
    if (isMobile) return undefined;

    const desktopRatio = 2; // Two facing pages (landscape spread)
    const horizontalMargin = viewport.width >= 1536 ? 180 : viewport.width >= 1280 ? 140 : 110;
    const verticalMargin = viewport.width >= 1536 ? 175 : viewport.width >= 1280 ? 165 : 155;
    const maxBookWidth = viewport.width >= 1536 ? 1400 : viewport.width >= 1280 ? 1280 : 1160;

    const availableWidth = Math.max(900, viewport.width - horizontalMargin);
    const availableHeight = Math.max(420, viewport.height - verticalMargin);

    const targetWidth = Math.min(availableWidth, availableHeight * desktopRatio, maxBookWidth);
    const targetHeight = targetWidth / desktopRatio;

    return {
      width: `${Math.round(targetWidth)}px`,
      height: `${Math.round(targetHeight)}px`,
    };
  })();

  const goToNext = () => {
    if (currentIndex < spreads.length - 1) {
      setDirection(1);
      setCurrentIndex(curr => curr + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(curr => curr - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
      z: -100
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1 // Stagger content animation
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      z: -100,
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    })
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Navigation Controls */}
      {!isMobile && (
        <>
          <NavButton 
            icon="chevron_left" 
            onClick={goToPrev} 
            disabled={currentIndex === 0} 
            className="absolute left-2 md:left-4 lg:left-10 z-50" 
          />
          <NavButton 
            icon="chevron_right" 
            onClick={goToNext} 
            disabled={currentIndex === spreads.length - 1} 
            className="absolute right-2 md:right-4 lg:right-10 z-50" 
          />
        </>
      )}

      {/* Book Container */}
      <div
        className={`book-container relative z-10 flex shadow-book-float rounded-md perspective-2000 ${isMobile ? 'w-full h-[min(540px,calc(100vh-8.5rem))]' : ''}`}
        style={desktopBookStyle}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col md:flex-row transform-style-3d origin-center"
          >
            {/* Center Gutter Shadow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-20 -translate-x-1/2 bg-gradient-to-r from-black/0 via-black/20 to-black/0 z-30 pointer-events-none mix-blend-multiply hidden md:block" />

            {/* Left Page */}
            <div className="w-full md:w-1/2 h-full bg-slate-900 relative overflow-hidden md:rounded-l-md border-r border-slate-800/50 page-left origin-right">
               {/* Content Wrapper for Animation */}
               <motion.div 
                 className="w-full h-full"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
               >
                  {spreads[currentIndex].left}
               </motion.div>
            </div>

            {/* Right Page */}
            <div className="w-full md:w-1/2 h-full bg-paper-light text-slate-800 relative overflow-hidden md:rounded-r-md page-right origin-left flex flex-col border-l border-slate-200/50">
               <motion.div 
                 className="w-full h-full relative z-10"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
               >
                  {spreads[currentIndex].right}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden absolute bottom-6 flex gap-4 items-center z-50">
        <button onClick={goToPrev} disabled={currentIndex === 0} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md disabled:opacity-30">
          <span className="material-symbols-outlined text-white">chevron_left</span>
        </button>
        <span className="text-white text-xs font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {spreads.length}
        </span>
        <button onClick={goToNext} disabled={currentIndex === spreads.length - 1} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 disabled:opacity-30">
          <span className="material-symbols-outlined text-white">chevron_right</span>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="fixed bottom-5 w-full py-2 bg-transparent z-40 text-center pointer-events-none hidden md:block">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg pointer-events-auto">
          {spreads.map((_, idx) => (
             <button
                key={idx}
                onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary ring-2 ring-primary/30 scale-125' : 'bg-white/20 hover:bg-white/40'}`}
             />
          ))}
          <span className="text-[10px] text-slate-400 ml-3 uppercase tracking-wider font-medium border-l border-white/10 pl-3">
             Dùng mũi tên để chuyển trang
          </span>
        </div>
      </div>
    </div>
  );
};
