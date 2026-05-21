/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Utensils, HeartCrack, ChevronRight, Play } from 'lucide-react';
import { HERO_IMAGE } from '../data';

export default function Hero() {

  const handleScrollToMenu = () => {
    const target = document.getElementById('kfc-menu');
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="kfc-hero" 
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]"
    >
      {/* Background Image with Parallax & Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img 
            src={HERO_IMAGE} 
            alt="Delicious Crispy KFC Fried Chicken" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
        </motion.div>
        {/* Dark to red radial overlay gradient */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#1A1A1A]/85 to-[#1A1A1A] z-10"></div>
        {/* Bottom fading mask */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent z-10"></div>
      </div>

      {/* Floating Sparkles & Spices for high-impact visual appeal */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden sm:block">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 text-yellow-400 opacity-60"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute top-2/3 right-1/4 text-red-500 opacity-50"
        >
          <Utensils className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-1/3 text-orange-400 opacity-40"
        >
          <div className="w-2 h-2 rounded-full bg-orange-400 blur-[1px]"></div>
        </motion.div>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Floating Top Mini Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E4002B]/10 rounded-full border border-[#E4002B]/40 text-xs text-[#E4002B] font-extrabold uppercase tracking-[0.15em] mb-6 shadow-sm shadow-[#E4002B]/10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4002B] animate-pulse"></span>
          Fresh, Crispy & Hand-breaded Daily
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase"
        >
          Finger Lickin' <br className="sm:hidden" />
          <span className="text-[#E4002B] drop-shadow-[0_4px_12px_rgba(228,0,43,0.3)] bg-clip-text">Good</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-gray-200 font-sans max-w-2xl leading-relaxed font-medium"
        >
          Hot, crispy, and freshly made just for you. Crafted with the Colonel's original 11 secret herbs and spices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          {/* Main order red button */}
          <button
            onClick={handleScrollToMenu}
            className="w-full sm:w-auto px-10 py-5 bg-[#E4002B] hover:bg-red-700 active:scale-95 text-white font-extrabold rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-[rgba(228,0,43,0.4)_0px_8px_24px] cursor-pointer transition-all duration-150 flex items-center justify-center gap-2"
          >
            Order Now
            <ChevronRight className="w-4.5 h-4.5" />
          </button>

          {/* Secondary view menu clear button */}
          <button
            onClick={handleScrollToMenu}
            className="w-full sm:w-auto px-10 py-5 border-2 border-white/80 hover:border-white hover:bg-white/10 active:scale-95 text-white font-extrabold rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xs cursor-pointer transition-all duration-150 flex items-center justify-center gap-2"
          >
            View Menu
          </button>
        </motion.div>

        {/* Three core brand traits */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl w-full border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-black text-white font-mono">100%</span>
            <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Fresh Poultry</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-black text-white font-mono">11 Secret</span>
            <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Herbs & Spices</span>
          </div>
          <div className="hidden sm:flex flex-col items-center col-span-2 sm:col-span-1">
            <span className="text-xl md:text-2xl font-black text-white font-mono">Freshly Made</span>
            <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Hand-Breaded Daily</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
