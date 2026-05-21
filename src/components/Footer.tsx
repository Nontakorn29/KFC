/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-white/5 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Logo Brand Segment */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {/* Retro striped Columns logo branding */}
              <div className="flex h-9 w-7 gap-[2px] py-0.5 bg-transparent justify-center">
                <div className="w-1.5 h-full bg-[#E4002B]"></div>
                <div className="w-1.5 h-full bg-white"></div>
                <div className="w-1.5 h-full bg-[#E4002B]"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white">KFC</span>
                <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-[#E4002B] leading-none -mt-1 font-mono">Original</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
              Hand-breading and serving the world's finest crispy fried chicken since 1952. Made with 11 secret herbs and spices and a whole lot of love.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-[#FFD700] tracking-widest font-mono">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-bold text-gray-300">
              <li>
                <button onClick={() => scrollToSection('kfc-hero')} className="hover:text-[#E4002B] cursor-pointer transition-colors block">
                  Top / Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('kfc-menu')} className="hover:text-[#E4002B] cursor-pointer transition-colors block">
                  Interactive Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('kfc-deals')} className="hover:text-[#E4002B] cursor-pointer transition-colors block">
                  Today's Specials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('kfc-finder')} className="hover:text-[#E4002B] cursor-pointer transition-colors block">
                  Find Nearest Branch
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('kfc-rewards')} className="hover:text-[#E4002B] cursor-pointer transition-colors block">
                  KFC Loyalty Club
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-[#FFD700] tracking-widest font-mono">Customer Care</h4>
            <ul className="space-y-2 text-xs text-gray-400 leading-relaxed font-semibold">
              <li>
                <span className="text-gray-300 block font-bold">Inquiries Phone:</span>
                <span className="font-mono text-white">+1 (800) CALL-KFC</span>
              </li>
              <li>
                <span className="text-gray-300 block font-bold">Feedback Email:</span>
                <span>contact@kfc-original-club.com</span>
              </li>
              <li>
                <span className="text-gray-300 block font-bold">Corporate Headquarters:</span>
                <span>1441 Gardiner Lane, Louisville, Kentucky, USA</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social segment */}
          <div className="space-y-4 col-span-1">
            <h4 className="text-xs uppercase font-extrabold text-[#FFD700] tracking-widest font-mono">Follow Colonel</h4>
            <div className="flex gap-3 text-gray-400 select-none">
              <span className="p-2.5 bg-white/5 border border-white/5 hover:border-[#E4002B] rounded-full text-white cursor-pointer transition-colors hover:bg-[#E4002B]">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="p-2.5 bg-white/5 border border-white/5 hover:border-[#E4002B] rounded-full text-white cursor-pointer transition-colors hover:bg-[#E4002B]">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="p-2.5 bg-white/5 border border-white/5 hover:border-[#E4002B] rounded-full text-white cursor-pointer transition-colors hover:bg-[#E4002B]">
                <Youtube className="w-4 h-4" />
              </span>
            </div>
            
            <div className="pt-2 text-[10px] text-gray-550 leading-relaxed">
              <span className="bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] font-black px-1.5 py-0.5 rounded mr-1 leading-none font-mono">
                NOTICE
              </span>
              This application is in "AI Sandbox" mode. No real orders are dispatched and no real bank information is compiled. Enjoy simulated crispy chicken!
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 gap-4 leading-none">
          <p className="font-semibold text-center sm:text-left">
            © {new Date().getFullYear()} KFC Applet. Designed and compiled of Google AI Studio. 100% Original Recipe. All Rights Reserved.
          </p>
          
          <div className="flex gap-4 font-bold text-gray-300 select-none">
            <span className="hover:text-white cursor-pointer uppercase font-mono tracking-wider">Privacy Policy</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer uppercase font-mono tracking-wider">Terms of Use</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer uppercase font-mono tracking-wider">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
