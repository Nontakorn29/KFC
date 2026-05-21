/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, ArrowRight, Heart } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: ('All' | 'Chicken' | 'Burgers' | 'Sides' | 'Drinks' | 'Combos')[] = [
  'All',
  'Chicken',
  'Burgers',
  'Sides',
  'Drinks',
  'Combos',
];

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Chicken' | 'Burgers' | 'Sides' | 'Drinks' | 'Combos'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  const toggleFavorite = (itemId: string) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handleAddToCartClick = (item: MenuItem) => {
    onAddToCart(item);
    setAddedNotification(item.name);
    setTimeout(() => {
      setAddedNotification(null);
    }, 2500);
  };

  // Filter items
  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="kfc-menu" className="py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 rounded-full border border-red-100 text-xs text-[#E4002B] font-extrabold uppercase tracking-wide mb-3">
            <Star className="w-3.5 h-3.5 fill-[#E4002B]" />
            Best Sellers & Fan Favorites
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Our Crispy Menu
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-550 leading-relaxed font-semibold">
            Freshly prepared, golden fried chicken, customized stack burgers, savory premium sides, and cold coolers all made on-site daily.
          </p>
        </div>

        {/* Global Floating Toast Success Added to Basket Notification */}
        <AnimatePresence>
          {addedNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-gray-800 text-center font-bold text-xs uppercase tracking-wider"
            >
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
              <span>Added to Basket: "{addedNotification}"</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Navbar Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1.5 p-1.5 bg-gray-50 border border-gray-100 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all duration-150 ${
                  activeCategory === cat
                    ? 'bg-[#E4002B] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-150 transition-all duration-300 flex flex-col flex-wrap"
                >
                  
                  {/* Image Holder */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient blur over image */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                    {/* Left top badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                      {item.isBestSeller && (
                        <span className="bg-[#E4002B] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
                          Best Seller
                        </span>
                      )}
                      {item.calories && (
                        <span className="bg-black/75 text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {item.calories} Kcal
                        </span>
                      )}
                    </div>

                    {/* Right top Favorite button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 hover:text-red-500 p-2 rounded-full shadow-md backdrop-blur-xs transition-colors cursor-pointer"
                      aria-label="Add to Favorites"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-red-500 text-red-500' : 'text-gray-700'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Core Content details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-extrabold text-[#1A1A1A] text-lg leading-tight uppercase group-hover:text-[#E4002B] transition-colors duration-150">
                          {item.name}
                        </h3>
                      </div>
                      
                      <p className="text-gray-500 text-xs sm:text-sm font-sans line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Pricing & Add to Cart button */}
                    <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Price</span>
                        <p className="text-xl font-black text-gray-900 font-mono -mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToCartClick(item)}
                        className="bg-[#E4002B] hover:bg-neutral-900 hover:shadow-md hover:border hover:border-white text-white font-bold text-xs uppercase tracking-wider py-3.5 px-5.5 rounded-2xl cursor-pointer transition-all duration-150 flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add To Basket
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Quick Footer banner explaining 100% original poultry */}
        <div className="mt-18 bg-[#1A1A1A] rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle red decoration banner stripe at edge */}
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#E4002B]"></div>
          
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg font-black uppercase tracking-tight">Craving something not listed?</h4>
            <p className="text-xs text-gray-400 font-sans max-w-lg leading-relaxed">
              Unlock our exclusive "Secret Vault Menu" instantly by registering with our premium rewards club program below!
            </p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('kfc-rewards');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#FFD700] hover:bg-yellow-400 text-black font-extrabold rounded-full text-xs uppercase tracking-widest flex items-center gap-1.5 shrink-0"
          >
            Unlock Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
