/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Clock, Phone, Navigation, Check, X, ShieldAlert, Store, Car, Truck } from 'lucide-react';
import { BRANCHES } from '../data';
import { Branch } from '../types';

export default function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('b1');
  const [filterDineIn, setFilterDineIn] = useState(false);
  const [filterDriveThru, setFilterDriveThru] = useState(false);
  const [filterDelivery, setFilterDelivery] = useState(false);
  const [directionsModalBranch, setDirectionsModalBranch] = useState<Branch | null>(null);

  // Filter branches based on search and selected features
  const filteredBranches = useMemo(() => {
    return BRANCHES.filter((b) => {
      const matchesSearch = 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDineIn = !filterDineIn || b.dineIn;
      const matchesDriveThru = !filterDriveThru || b.driveThru;
      const matchesDelivery = !filterDelivery || b.delivery;

      return matchesSearch && matchesDineIn && matchesDriveThru && matchesDelivery;
    });
  }, [searchTerm, filterDineIn, filterDriveThru, filterDelivery]);

  const selectedBranch = useMemo(() => {
    return BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];
  }, [selectedBranchId]);

  return (
    <section id="kfc-finder" className="py-24 bg-gray-50 border-y border-gray-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-150 rounded-full border border-gray-200 text-xs text-gray-800 font-extrabold uppercase tracking-wide mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#E4002B]" />
            Restaurant Finder
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Find KFC Near You
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-semibold">
            Freshly-breaded chicken is closer than you think. Search our active branches below and select the perfect dine-in or drive-thru spot.
          </p>
        </div>

        {/* Search Bar & Amenities filters */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Search Input Box */}
            <div className="relative lg:col-span-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find a KFC near you (e.g. Downtown, Ocean, Boulevard)"
                className="w-full text-sm py-4.5 pl-12 pr-4 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#E4002B] focus:border-[#E4002B]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1 leading-none"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter buttons checklist details */}
            <div className="lg:col-span-7 flex flex-wrap gap-3 items-center justify-start lg:justify-end">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-450 mr-2 block">
                Amenities:
              </span>
              
              {/* Dine-In toggle */}
              <button
                onClick={() => setFilterDineIn(!filterDineIn)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  filterDineIn
                    ? 'border-[#E4002B] bg-red-50 text-[#E4002B]'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Store className="w-4 h-4" />
                Dine-In
              </button>

              {/* Drive-Thru toggle */}
              <button
                onClick={() => setFilterDriveThru(!filterDriveThru)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  filterDriveThru
                    ? 'border-[#E4002B] bg-red-50 text-[#E4002B]'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Car className="w-4 h-4" />
                Drive-Thru
              </button>

              {/* Delivery toggle */}
              <button
                onClick={() => setFilterDelivery(!filterDelivery)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  filterDelivery
                    ? 'border-[#E4002B] bg-red-50 text-[#E4002B]'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Truck className="w-4 h-4" />
                Delivery
              </button>
            </div>

          </div>
        </div>

        {/* Master Map and List layout Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: List of Branches */}
          <div className="lg:col-span-5 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
            {filteredBranches.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-gray-150 flex flex-col items-center justify-center">
                <ShieldAlert className="w-10 h-10 text-red-500 mb-3" />
                <h4 className="font-extrabold text-gray-900 uppercase">No branches found</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Try clearing some filter checkmarks or searching for another key term.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterDineIn(false);
                    setFilterDriveThru(false);
                    setFilterDelivery(false);
                  }}
                  className="mt-4 text-xs font-black text-[#E4002B] uppercase tracking-wide underline decoration-dotted"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredBranches.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#E4002B] bg-white shadow-md'
                        : 'border-transparent bg-white hover:border-gray-200 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Name & Badge */}
                      <div className="flex justify-between items-start gap-1 pb-2">
                        <h3 className="font-extrabold text-gray-950 uppercase text-sm">
                          {branch.name}
                        </h3>
                        {/* Selected Bullet point */}
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#E4002B]" />
                        )}
                      </div>

                      {/* Info lines */}
                      <p className="text-[#E4002B] font-bold text-xs flex items-start gap-1.5 leading-snug">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" />
                        <span>{branch.address}</span>
                      </p>

                      <div className="mt-3.5 space-y-1.5 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>Hours: <strong className="font-semibold text-gray-750">{branch.hours}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>Phone: <strong className="font-mono text-gray-750">{branch.phone}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities tag chips & Direction button */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex gap-1.5 flex-wrap">
                        {branch.dineIn && (
                          <span className="bg-orange-50 text-orange-700 text-[9px] font-bold px-1.5 py-0.5 rounded" title="Dine-In Available">
                            Dine-In
                          </span>
                        )}
                        {branch.driveThru && (
                          <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded" title="Drive-Thru Available">
                            Drive-Thru
                          </span>
                        )}
                        {branch.delivery && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded" title="Delivery Available">
                            Delivery
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDirectionsModalBranch(branch);
                        }}
                        className="bg-[#1A1A1A] hover:bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 px-3 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Navigation className="w-3 h-3" />
                        Directions
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Right Block: Live Google Maps Styled Vector Layout container */}
          <div className="lg:col-span-7 bg-[#EFEFEF] rounded-3xl overflow-hidden border border-gray-200 relative min-h-[400px] lg:min-h-auto flex flex-col shadow-inner">
            
            {/* Map Area Canvas */}
            <div className="flex-1 relative overflow-hidden bg-slate-250 select-none">
              
              {/* Street grid vectors (faking a real minimalist Google Map structure) */}
              <svg className="absolute inset-0 w-full h-full text-white pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Clean river blue waterbody */}
                <path d="M 0,100 Q 200,120 400,80 T 800,150 L 800,0 L 0,0 Z" fill="#D6E4F0" />
                <path d="M 0,250 C 300,180 500,430 800,320 L 800,500 L 0,500 Z" fill="#E6EEF4" opacity="0.5" />
                
                {/* Major streets */}
                <path d="M -50,300 L 850,300" stroke="#FFFFFF" strokeWidth="20" fill="none" />
                <path d="M -50,300 L 850,300" stroke="#E2E8F0" strokeWidth="1" fill="none" />

                <path d="M 350,-50 L 350,650" stroke="#FFFFFF" strokeWidth="24" fill="none" />
                <path d="M 350,-50 L 350,650" stroke="#E2E8F0" strokeWidth="1" fill="none" />

                <path d="M 120,-50 Q 180,300 120,650" stroke="#FFFFFF" strokeWidth="16" fill="none" />
                <path d="M 120,-50 Q 180,300 120,650" stroke="#E2E8F0" strokeWidth="1" fill="none" />

                <path d="M -50,110 L 850,420" stroke="#FFFFFF" strokeWidth="14" fill="none" />
                <path d="M -50,110 L 850,420" stroke="#E2E8F0" strokeWidth="1" fill="none" />

                {/* Grid blocks */}
                <rect x="40" y="40" width="70" height="40" rx="4" fill="#E2E8F0" opacity="0.3" />
                <rect x="250" y="160" width="80" height="90" rx="4" fill="#E2E8F0" opacity="0.3" />
                <rect x="380" y="200" width="180" height="80" rx="4" fill="#E2E8F0" opacity="0.3" />
                <rect x="420" y="40" width="150" height="120" rx="4" fill="#E2E8F0" opacity="0.3" />
                <rect x="20" y="380" width="100" height="90" rx="4" fill="#E2E8F0" opacity="0.3" />
                <rect x="480" y="360" width="180" height="110" rx="4" fill="#E2E8F0" opacity="0.3" />
              </svg>

              {/* Plotted Interactive PINS */}
              {BRANCHES.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                const isShowing = filteredBranches.some(fb => fb.id === branch.id);
                
                if (!isShowing) return null;

                return (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group transition-all z-20"
                    style={{ left: `${branch.lng}%`, top: `${branch.lat}%` }}
                  >
                    {/* Ring Pulse wave */}
                    <span className={`absolute inset-0 rounded-full scale-250 opacity-40 transition-all ${
                      isSelected ? 'bg-red-500 animate-ping' : 'bg-transparent'
                    }`}></span>

                    {/* Classic Pin graphics */}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-8.5 h-11 flex items-center justify-center relative shadow-md transition-transform duration-200 ${
                        isSelected ? 'scale-115 text-red-650' : 'text-gray-700 hover:text-red-500'
                      }`}>
                        {/* MapPin Red base icon */}
                        <MapPin className="absolute inset-0 w-full h-full fill-white" />
                        {/* Tiny original striped columns monogram */}
                        <span className="absolute top-[8px] flex gap-[1px]">
                          <span className="w-0.5 h-3 bg-[#E4002B]"></span>
                          <span className="w-0.5 h-3 bg-white"></span>
                          <span className="w-0.5 h-3 bg-[#E4002B]"></span>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Map Controls bottom bar info */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-md border border-gray-200/80 max-w-xs z-30 pointer-events-none">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Map Selected</p>
                <h4 className="text-xs font-extrabold text-gray-900 uppercase">
                  {selectedBranch.name}
                </h4>
                <p className="text-[10px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Open Now
                </p>
              </div>

              {/* Bottom attribution copyright watermark */}
              <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[8px] text-gray-500 font-mono font-bold z-10 select-none">
                © Google Map Data 2026 Mapbox OSM
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Direction Routing Overlay Modal Dialog */}
      <AnimatePresence>
        {directionsModalBranch && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDirectionsModalBranch(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="bg-white text-gray-950 rounded-3xl max-w-lg w-full relative z-10 shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-[#1A1A1A] text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#E4002B] animate-bounce" />
                  <h3 className="font-extrabold text-[#FFFFFF] uppercase tracking-wide text-sm">
                    Routing to {directionsModalBranch.name}
                  </h3>
                </div>
                <button
                  onClick={() => setDirectionsModalBranch(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Steps core */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs">
                  <span>Start: <strong className="font-semibold text-gray-800">Your Current Location</strong></span>
                  <span className="bg-[#FFD700] text-black font-extrabold px-2 py-0.5 rounded uppercase tracking-wide">
                    2.8 Miles (12 mins)
                  </span>
                </div>

                {/* Simulated Steps */}
                <div className="space-y-3 text-xs text-gray-650 max-h-[250px] overflow-y-auto pr-1">
                  
                  <div className="flex gap-3 items-start border-l-2 border-emerald-500 pl-4 py-1 relative">
                    <span className="absolute -left-[5px] top-[10px] w-2 h-2 rounded-full bg-emerald-500"></span>
                    <div>
                      <p className="font-bold text-gray-800">1. Head North on Maple Street</p>
                      <p className="text-gray-450 mt-0.5">Go straight for 0.4 miles, passing the public library on your left.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start border-l-2 border-gray-200 pl-4 py-1 relative">
                    <span className="absolute -left-[5px] top-[10px] w-2 h-2 rounded-full bg-gray-300"></span>
                    <div>
                      <p className="font-bold text-gray-800">2. Turn Right onto Metro Highway Entrance East</p>
                      <p className="text-gray-450 mt-0.5">Merge into lanes 2 and 3. Speed limit 55 mph. Drive for 1.8 miles.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start border-l-2 border-gray-200 pl-4 py-1 relative">
                    <span className="absolute -left-[5px] top-[10px] w-2 h-2 rounded-full bg-gray-300"></span>
                    <div>
                      <p className="font-bold text-gray-800">3. Take exit 9 toward Downtown Plaza / waterfront boulevard</p>
                      <p className="text-gray-450 mt-0.5">Merge into the right-hand fork slip road toward grand boulevard.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start border-l-2 border-[#E4002B] pl-4 py-1 relative">
                    <span className="absolute -left-[5px] top-[10px] w-2 h-2 rounded-full bg-[#E4002B]"></span>
                    <div>
                      <p className="font-bold text-red-650">4. Arrive at Branch Destination on the Left</p>
                      <p className="text-gray-450 mt-0.5">{directionsModalBranch.address}. Look for the iconic red and white columns striped signage!</p>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => {
                      alert('Simulating direct Google Maps app integration. Safe routing shared with your phone contact!');
                      setDirectionsModalBranch(null);
                    }}
                    className="flex-1 bg-[#E4002B] text-white font-extrabold py-3 rounded-xl uppercase tracking-wider text-center text-xs hover:bg-red-700 cursor-pointer"
                  >
                    Open in Phone GPS
                  </button>
                  <button
                    onClick={() => setDirectionsModalBranch(null)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs uppercase tracking-wider font-extrabold rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
