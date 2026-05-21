/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Gift, Trophy, CheckCircle, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function LoyaltyRewards() {
  const [emailInput, setEmailInput] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [pointsCount, setPointsCount] = useState(0);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setSignUpSuccess(true);
    // Animate points tick up from 0 to 500 points!
    let count = 0;
    const interval = setInterval(() => {
      count += 25;
      if (count >= 500) {
        setPointsCount(500);
        clearInterval(interval);
      } else {
        setPointsCount(count);
      }
    }, 40);
  };

  return (
    <section id="kfc-rewards" className="py-24 bg-white scroll-mt-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Intro and Steps */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-xs text-amber-700 font-extrabold uppercase tracking-wide">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Loyalty Club program
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight leading-none">
                KFC <span className="text-[#E4002B]">REWARDS</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-550 max-w-xl font-semibold leading-relaxed">
                Turn your crispy cravings into gold rewards. Join millions of chicken lovers earning standard points back on every bucket.
              </p>
            </div>

            {/* 3 Step Process List */}
            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-amber-200 hover:shadow-xs transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-550/10 text-[#E4002B] flex items-center justify-center shrink-0">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-mono">Step 01</span>
                    <h4 className="font-extrabold text-[#1A1A1A] uppercase text-sm">Sign Up in 10 Seconds</h4>
                  </div>
                  <p className="text-xs text-gray-550 mt-1 max-w-md font-medium leading-relaxed">
                    Create a free account with your email. Get an instant 500 entry bonus points on landing!
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-amber-200 hover:shadow-xs transition-all">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-mono">Step 02</span>
                    <h4 className="font-extrabold text-[#1A1A1A] uppercase text-sm">Earn 10 Points Per $1</h4>
                  </div>
                  <p className="text-xs text-gray-550 mt-1 max-w-md font-medium leading-relaxed">
                    Order crispy chicken online, in-app, or scan your QR code at dine-in counters. Watch your points bundle skyrocket.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-amber-200 hover:shadow-xs transition-all">
                <div className="w-12 h-12 rounded-xl bg-orange-550/10 text-orange-600 flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-mono">Step 03</span>
                    <h4 className="font-extrabold text-[#1A1A1A] uppercase text-sm">Redeem For Free Combos</h4>
                  </div>
                  <p className="text-xs text-gray-550 mt-1 max-w-md font-medium leading-relaxed">
                    Convert accumulated balance into Free Burgers, Zinger Buckets, crunchy French Fries or exclusive VIP merch boxes.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Animated Sign-Up Widget Box */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Background Glow behind box */}
            <div className="absolute inset-x-12 inset-y-12 bg-gradient-to-tr from-[#E4002B] to-[#FFD700] rounded-3xl blur-3xl opacity-15 pointer-events-none"></div>

            <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2B1B1B] text-white rounded-[2rem] p-8 shadow-2xl border border-white/5 space-y-6">
              
              {/* Header inside form */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FFD700] tracking-widest font-mono">REWARDS PORTAL</span>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight mt-1">Claim Bonus</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FFD700]/15 flex items-center justify-center text-[#FFD700]">
                  <Sparkles className="w-5 h-5 animate-spin-slow" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!signUpSuccess ? (
                  <motion.div
                    key="form-join"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-xs text-gray-400 font-sans leading-relaxed font-semibold">
                      Enter your email to unlock your verified registration. We'll credit your profile with <strong className="text-white">+500 Welcome Points</strong> instantly!
                    </p>

                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="colonel.sanders@kfc.com"
                          className="w-full text-xs font-semibold py-4.5 pl-4 pr-10 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFD700] focus:border-[#FFD700]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#FFD700] hover:bg-yellow-450 active:scale-[0.98] text-black font-extrabold py-4.5 rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Join Now
                        <ArrowRight className="w-4 h-4 text-black" />
                      </button>
                    </form>

                    <p className="text-[9px] text-gray-500 text-center font-mono uppercase tracking-widest">
                      * NO CREDIT CARD REQUIRED. CANCEL SUBSCRIPTION ANY TIME.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-join"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-5"
                  >
                    <div className="w-14 h-14 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full flex items-center justify-center mx-auto text-[#FFD700] scale-110">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-black uppercase text-white">Colonel Verified!</h4>
                      <p className="text-xs text-gray-400 font-sans">
                        Congrats on joining the club, <strong className="text-[#FFD700]">{emailInput}</strong>!
                      </p>
                    </div>

                    {/* Points Counter Box */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 max-w-xs mx-auto">
                      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block font-mono">YOUR REWARDS ACCOUNT BALANCE</span>
                      <span className="text-3xl font-black text-[#FFD700] font-mono block mt-1 tracking-wider">
                        {pointsCount} <span className="text-xs uppercase font-extrabold text-white">PTS</span>
                      </span>
                    </div>

                    <p className="text-[10px] text-emerald-400 font-mono font-bold animate-pulse">
                      ✓ Instant $5 checkout coupon credit shared to email!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
