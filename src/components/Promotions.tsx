/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Check, Copy, AlertTriangle, HelpCircle } from 'lucide-react';
import { PROMOTIONS } from '../data';
import { Promotion } from '../types';

interface PromotionsProps {
  onGrabPromo: (code: string) => void;
  appliedPromoCode?: string;
}

// Live Countdown Timer Component
function DealTimer({ durationSec }: { durationSec: number }) {
  const [timeLeft, setTimeLeft] = useState(durationSec);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs font-black bg-black/60 text-[#FFD700] px-3 py-1.5 rounded-lg border border-[#FFD700]/30 select-none backdrop-blur-xs">
      <Clock className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      <span>{pad(h)}</span>
      <span className="text-red-500">:</span>
      <span>{pad(m)}</span>
      <span className="text-red-500">:</span>
      <span>{pad(s)}</span>
    </div>
  );
}

export default function Promotions({ onGrabPromo, appliedPromoCode }: PromotionsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [dealClaimed, setDealClaimed] = useState<string | null>(null);

  const handleGrabDeal = (promo: Promotion) => {
    // Copy to clipboard
    navigator.clipboard.writeText(promo.code);
    setCopiedCode(promo.code);
    onGrabPromo(promo.code);

    setDealClaimed(promo.title);

    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);

    setTimeout(() => {
      setDealClaimed(null);
    }, 3000);
  };

  return (
    <section id="kfc-deals" className="py-24 bg-gradient-to-br from-[#E4002B] via-red-700 to-amber-700 text-white scroll-mt-12 overflow-hidden relative">
      
      {/* Visual backplate geometric details */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full border-[30px] border-white"></div>
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-yellow-400 blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFD700] text-black font-extrabold uppercase rounded-full tracking-wider text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            Exclusive Online Specials
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Today's Hot Deals
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-red-100 font-medium">
            Lock in these exclusive limited-time coupon codes! Tap "Grab the Deal" to instantly copy the code and apply your discount during checkout.
          </p>
        </div>

        {/* Coupon Claim Toast Notification */}
        <AnimatePresence>
          {dealClaimed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 bg-emerald-600 border border-emerald-500 text-white py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-xs uppercase tracking-wider"
            >
              <Check className="w-4 h-4 bg-white text-emerald-600 rounded-full p-0.5" />
              <span>Deal Applied: "{dealClaimed}"!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROMOTIONS.map((promo) => {
            const isApplied = appliedPromoCode === promo.code;
            return (
              <motion.div
                whileHover={{ y: -6 }}
                key={promo.id}
                className="bg-white rounded-3xl overflow-hidden border border-white/10 shadow-xl text-gray-900 flex flex-col justify-between"
              >
                
                {/* Header colored banner code box */}
                <div className={`p-6 bg-gradient-to-r ${promo.bgColor} text-white flex flex-col justify-between h-40 relative`}>
                  <div className="flex justify-between items-start gap-2">
                    <span className="bg-white/25 border border-white/25 text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded-full backdrop-blur-md">
                      {promo.badge}
                    </span>
                    
                    {/* Living timer countdown */}
                    <DealTimer durationSec={promo.expiryTime} />
                  </div>

                  <div className="mt-auto">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-yellow-300">Instant Savings</p>
                    <h3 className="text-3xl font-black tracking-tight uppercase leading-none font-sans mt-0.5">
                      {promo.discount}
                    </h3>
                  </div>
                </div>

                {/* Offer Contents */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-black uppercase text-gray-900 leading-tight">
                      {promo.title}
                    </h4>
                    <p className="text-[#E4002B] text-xs font-bold leading-normal">
                      "{promo.tagline}"
                    </p>
                    <p className="text-gray-500 text-xs sm:text-xs leading-relaxed mt-2 font-medium">
                      {promo.description}
                    </p>
                  </div>

                  {/* Promo coupon coupon key and CTA button */}
                  <div className="mt-8 pt-5 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Coupon Code</span>
                        <span className="font-mono font-extrabold text-sm text-gray-800 tracking-wider">
                          {promo.code}
                        </span>
                      </div>
                      
                      {copiedCode === promo.code ? (
                        <span className="text-emerald-600 flex items-center gap-1 text-[10px] uppercase font-black tracking-wider">
                          <Check className="w-3.5 h-3.5" /> Copied
                        </span>
                      ) : (
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(promo.code);
                            setCopiedCode(promo.code);
                            setTimeout(() => setCopiedCode(null), 2000);
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-250"
                          title="Copy Code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => handleGrabDeal(promo)}
                      className={`w-full py-4 rounded-xl text-xs uppercase tracking-widest font-extrabold transition-all duration-150 flex items-center justify-center gap-2 select-none cursor-pointer ${
                        isApplied 
                          ? 'bg-emerald-600 text-white shadow-inner cursor-default'
                          : 'bg-[#E4002B] hover:bg-[#1A1A1A] text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Promo Code Applied!
                        </>
                      ) : (
                        <>
                          Grab The Deal
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Explanatory notes footer */}
        <p className="mt-10 text-center font-mono text-[10px] text-red-200 uppercase tracking-widest leading-relaxed">
          * Offers valid on online orders only. Limit 1 coupon code per basket checkout session. Limited quantities available.
        </p>

      </div>
    </section>
  );
}
