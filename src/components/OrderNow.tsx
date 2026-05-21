/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Download, ExternalLink, ShoppingBag, TerminalSquare } from 'lucide-react';

export default function OrderNow() {

  const handleDeepLinkSimulation = (platform: string) => {
    alert(`Simulating deep-link connection to ${platform}. In production, this redirects the customer's phone directly to the official storefront checkouts!`);
  };

  return (
    <section id="kfc-ordernow" className="py-20 bg-[#111111] border-t border-gray-900 overflow-hidden relative">
      
      {/* Background visual detail */}
      <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#E4002B]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
        
        {/* Banner Headers */}
        <div className="max-w-xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Craving KFC? <br className="sm:hidden" />
            <span className="text-[#E4002B]">Order in minutes.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed font-semibold">
            Skip the queues and let the crunch fly to your doorstep. Choose your preferred delivery platform below for lightning-fast transit times.
          </p>
        </div>

        {/* Platforms CTA Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* KFC App Custom App store button */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleDeepLinkSimulation('Official KFC App')}
            className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-[#E4002B] hover:shadow-[rgba(228,0,43,0.15)_0px_8px_24px] cursor-pointer transition-all duration-150 flex flex-col justify-between text-left group"
          >
            <div className="flex justify-between items-start">
              {/* Fake branded logo styling */}
              <div className="flex items-center gap-2">
                <div className="flex gap-[2px] h-8 w-6 bg-transparent items-center">
                  <div className="w-1 h-full bg-[#E4002B]"></div>
                  <div className="w-1 h-full bg-white"></div>
                  <div className="w-1 h-full bg-[#E4002B]"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-tighter text-white">KFC APP</span>
                  <span className="text-[7px] uppercase font-bold tracking-[0.1em] text-gray-400 -mt-1 leading-none font-mono">Mobile</span>
                </div>
              </div>
              <Download className="w-4.5 h-4.5 text-gray-500 group-hover:text-white" />
            </div>

            <div className="mt-8">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#E4002B] font-mono block">GET 15% OFF IN-APP</span>
              <h4 className="text-base font-extrabold text-white uppercase mt-0.5">KFC App Direct</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-medium mt-1">
                Order directly from our master app to unlock special codes and free shipping!
              </p>
            </div>
          </motion.div>

          {/* GrabFood Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleDeepLinkSimulation('GrabFood Store')}
            className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-emerald-500 hover:shadow-[rgba(16,185,129,0.1)_0px_8px_24px] cursor-pointer transition-all duration-150 flex flex-col justify-between text-left group"
          >
            <div className="flex justify-between items-start">
              {/* Grab icon mimic styling */}
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-black text-white text-xs tracking-tighter font-mono italic">
                  G
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-tighter text-white uppercase">GrabFood</span>
                  <span className="text-[7px] uppercase font-bold tracking-[0.1em] text-gray-400 -mt-1 leading-none font-mono">Premium Partner</span>
                </div>
              </div>
              <ExternalLink className="w-4.5 h-4.5 text-gray-500 group-hover:text-white" />
            </div>

            <div className="mt-8">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 font-mono block">FREE SHIPPING ACTIVE</span>
              <h4 className="text-base font-extrabold text-white uppercase mt-0.5">GrabFood Express</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-medium mt-1">
                Enjoy lightning fast delivery via GrabFood. Guaranteed hot & fresh.
              </p>
            </div>
          </motion.div>

          {/* Foodpanda Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleDeepLinkSimulation('FoodPanda Portal')}
            className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-pink-500 hover:shadow-[rgba(236,72,153,0.1)_0px_8px_24px] cursor-pointer transition-all duration-150 flex flex-col justify-between text-left group"
          >
            <div className="flex justify-between items-start">
              {/* Foodpanda icon mimic styling */}
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center font-black text-white text-xs uppercase tracking-tighter font-mono italic">
                  P
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-tighter text-white uppercase">Foodpanda</span>
                  <span className="text-[7px] uppercase font-bold tracking-[0.1em] text-gray-400 -mt-1 leading-none font-mono">Quick Rider</span>
                </div>
              </div>
              <ExternalLink className="w-4.5 h-4.5 text-gray-500 group-hover:text-white" />
            </div>

            <div className="mt-8">
              <span className="text-[10px] uppercase font-black tracking-widest text-pink-500 font-mono block">20-MIN TRANSIT GUARANTEE</span>
              <h4 className="text-base font-extrabold text-white uppercase mt-0.5">Foodpanda Delivery</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-medium mt-1">
                Reliable pink riders tracking your favorite buckets directly to your kitchen.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
