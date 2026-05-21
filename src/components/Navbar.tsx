/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, CheckCircle2, Percent, Sparkles, ShoppingBag } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onUpdateQuantity: (menuItemId: string, newQty: number) => void;
  onClearCart: () => void;
  onAddPromoDiscount: (discountVal: number, code: string) => void;
  appliedPromo: { code: string; discount: number } | null;
}

export default function Navbar({
  cart,
  onUpdateQuantity,
  onClearCart,
  onAddPromoDiscount,
  appliedPromo,
}: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Checkout address info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Calculate totals
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  
  // Rules for discount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'ZINGER30') {
      // 30% off subtotal
      discountAmount = parseFloat((subtotal * 0.3).toFixed(2));
    } else if (appliedPromo.code === 'BOGOPOWER') {
      // BOGO: deduct the price of one cheap item, say flat $5.00 or actual BOGO deduction limit
      discountAmount = subtotal > 15 ? 7.49 : 3.00;
    } else if (appliedPromo.code === 'CHEESYCRUSH') {
      // flat $3 discount
      discountAmount = Math.min(subtotal, 3.00);
    }
  }

  const deliveryFee = subtotal > 25 ? 0 : (subtotal > 0 ? 3.99 : 0);
  const salesTax = parseFloat(((subtotal - discountAmount) * 0.08).toFixed(2));
  const finalTotal = parseFloat((Math.max(0, subtotal - discountAmount) + deliveryFee + (subtotal > 0 ? salesTax : 0)).toFixed(2));

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'ZINGER30') {
      onAddPromoDiscount(30, 'ZINGER30');
      setPromoCodeInput('');
    } else if (code === 'BOGOPOWER') {
      onAddPromoDiscount(15, 'BOGOPOWER');
      setPromoCodeInput('');
    } else if (code === 'CHEESYCRUSH') {
      onAddPromoDiscount(10, 'CHEESYCRUSH');
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid coupon code. Try ZINGER30 or BOGOPOWER!');
    }
  };

  const executeScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill out the required checkout details.');
      return;
    }
    setCheckoutStep('success');
  };

  const handleResetCheckout = () => {
    onClearCart();
    setCheckoutStep('cart');
    setIsCartOpen(false);
    setName('');
    setPhone('');
    setAddress('');
    setDeliveryNote('');
  };

  return (
    <>
      {/* Sticky Header Nav */}
      <nav id="kfc-navbar" className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            
            {/* KFC Logo Badge & Brand Branding */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 cursor-pointer group"
              id="kfc-logo-nav"
            >
              {/* Retro KFC Styled Columns stripes */}
              <div className="flex h-10 w-8 gap-[3px] py-1 bg-transparent justify-center">
                <div className="w-1.5 h-full bg-[#E4002B]"></div>
                <div className="w-1.5 h-full bg-white"></div>
                <div className="w-1.5 h-full bg-[#E4002B]"></div>
              </div>
              <div className="flex flex-col select-none">
                <span className="text-2xl font-black tracking-tighter text-[#1A1A1A] group-hover:text-[#E4002B] transition-colors duration-150">
                  KFC
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#E4002B] leading-none -mt-1 font-mono">
                  Original
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-sans font-semibold text-[#1A1A1A] text-sm">
              <button onClick={() => executeScroll('kfc-hero')} className="hover:text-[#E4002B] transition-colors cursor-pointer py-2">Home</button>
              <button onClick={() => executeScroll('kfc-menu')} className="hover:text-[#E4002B] transition-colors cursor-pointer py-2">Our Menu</button>
              <button onClick={() => executeScroll('kfc-deals')} className="hover:text-[#E4002B] transition-colors cursor-pointer py-2">Today's Deals</button>
              <button onClick={() => executeScroll('kfc-finder')} className="hover:text-[#E4002B] transition-colors cursor-pointer py-2">Find KFC</button>
              <button onClick={() => executeScroll('kfc-rewards')} className="hover:text-[#E4002B] transition-colors cursor-pointer py-2">Loyalty Rewards</button>
            </div>

            {/* Action Area: Cart Trigger & Hamburger Menu */}
            <div className="flex items-center gap-3">
              {/* Order Now Quick Button (Static Desktop) */}
              <button 
                onClick={() => executeScroll('kfc-menu')} 
                className="hidden lg:block bg-[#E4002B] hover:bg-red-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150"
                id="btn-nav-order"
              >
                Order Now
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-800 hover:text-[#E4002B] border border-gray-100 transition-all cursor-pointer"
                aria-label="Shopping Cart"
                id="btn-nav-cart"
              >
                <ShoppingCart className="w-5.5 h-5.5" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#E4002B] text-white text-xs font-black min-w-5 h-5 flex items-center justify-center px-1 rounded-full border-2 border-white shadow-sm font-mono"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center p-2 rounded-lg bg-gray-50 text-gray-800"
                aria-label="Toggle Menu"
                id="btn-nav-mobile"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-50 shadow-inner px-4 py-4 space-y-3 font-sans font-semibold text-[#1A1A1A]"
            >
              <button onClick={() => executeScroll('kfc-hero')} className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-[#E4002B]">Home</button>
              <button onClick={() => executeScroll('kfc-menu')} className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-[#E4002B]">Our Menu</button>
              <button onClick={() => executeScroll('kfc-deals')} className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-[#E4002B]">Today's Deals</button>
              <button onClick={() => executeScroll('kfc-finder')} className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-[#E4002B]">Find KFC</button>
              <button onClick={() => executeScroll('kfc-rewards')} className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-[#E4002B]">Loyalty Rewards</button>
              <div className="pt-2">
                <button 
                  onClick={() => executeScroll('kfc-menu')}
                  className="w-full bg-[#E4002B] text-white py-3 font-bold rounded-lg uppercase tracking-wide text-center block"
                >
                  Order Spicy Chicken
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Slider Drawer Backdrop overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs transition-opacity duration-200"
          >
            {/* Draw Slider Core */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing on slide click
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white text-gray-900 shadow-2xl flex flex-col h-full z-50 border-l border-gray-100"
              id="kfc-cart-drawer"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center px-5 py-4.5 border-b border-gray-100 bg-gray-50/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E4002B]" />
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    Your Bucket ({totalItemsCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Scrollable Container based on sub-state (cart, checkout, success) */}
              <div className="flex-1 overflow-y-auto p-5">
                
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#E4002B] mb-5">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-800">Your basket is empty</h4>
                        <p className="text-gray-550 text-sm mt-1 max-w-xs">
                          Hot, crispy fried chicken and burgers are waiting for you inside the menu.
                        </p>
                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                            executeScroll('kfc-menu');
                          }}
                          className="mt-6 bg-[#E4002B] text-white px-5 py-2.5 font-bold rounded-full text-xs uppercase tracking-wider hover:bg-red-700 transition-colors"
                        >
                          Explore Menu
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div 
                            key={item.menuItem.id}
                            className="flex gap-3 bg-white p-3 rounded-xl border border-gray-100 hover:shadow-xs transition-shadow"
                          >
                            <img
                              src={item.menuItem.image}
                              alt={item.menuItem.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 object-cover rounded-lg border border-gray-50 flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                                  {item.menuItem.name}
                                </h4>
                                <span className="text-xs text-gray-500 font-mono">${item.menuItem.price.toFixed(2)} each</span>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                  <button
                                    onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                                    className="px-2 py-1 hover:bg-gray-50 text-gray-600 transition-colors"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="px-3 text-xs font-bold text-gray-800 font-mono select-none">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                    className="px-2 py-1 hover:bg-gray-50 text-gray-600 transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, 0)}
                                  className="text-gray-400 hover:text-red-600 p-1 rounded-md transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Coupon Promo Segment */}
                        <div className="mt-6 pt-5 border-t border-gray-100">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                            Have a Promo Code?
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCodeInput}
                              onChange={(e) => setPromoCodeInput(e.target.value)}
                              placeholder="e.g. ZINGER30 or BOGOPOWER"
                              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm uppercase bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#E4002B] focus:border-[#E4002B]"
                            />
                            <button
                              onClick={handleApplyPromo}
                              className="bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-xs font-semibold text-red-600 mt-1">{promoError}</p>
                          )}
                          {appliedPromo && (
                            <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs font-semibold p-2.5 rounded-lg mt-2 border border-emerald-100 h-9">
                              <span className="flex items-center gap-1.5">
                                <Percent className="w-3.5 h-3.5" />
                                Applied: <strong className="font-bold">{appliedPromo.code}</strong>
                              </span>
                              <button
                                onClick={() => onAddPromoDiscount(0, '')}
                                className="text-emerald-700 hover:text-emerald-950 font-black"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                          {!appliedPromo && (
                            <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#FFD700]" /> Try code <span className="font-bold font-mono">ZINGER30</span> (30% off) or <span className="font-bold font-mono">BOGOPOWER</span>!
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'checkout' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-amber-900 text-xs mb-2">
                      <span className="font-bold">Estimated Delivery:</span> 25-35 minutes from nearest branch.
                    </div>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">Delivery Information</h4>

                    <div>
                      <label className="text-xs font-semibold text-gray-650 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Colonel Sanders"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-[#E4002B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-650 block mb-1">Mobile Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-[#E4002B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-650 block mb-1">Delivery Street Address *</label>
                      <textarea
                        required
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="11 Herbs Highway, Apt 3B, New York..."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-[#E4002B] focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-650 block mb-1">Driver Note (Optional)</label>
                      <input
                        type="text"
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        placeholder="Ring buzzer or leave at main reception counter"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-[#E4002B] focus:outline-none"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-xs">
                      <p className="font-bold text-gray-700 mb-1">Payment Method</p>
                      <p className="text-[#E4002B] font-bold flex items-center gap-1">
                        Cash on Delivery (COD) / Card Terminal on Arrival
                      </p>
                      <p className="text-gray-500 mt-1 leading-snug">
                        Due to security sandbox restrictions, payment runs as a secure mock delivery. No real money required!
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider test-center transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-2 bg-[#E4002B] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 scale-110">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 uppercase">Finger Lickin' Ordered!</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Woohoo, <strong className="font-semibold text-gray-800">{name}</strong>! Your order is being freshly breaded in our kitchens.
                    </p>

                    <div className="w-full border border-[#FFD700] bg-amber-50/50 rounded-2xl p-4.5 mt-6 text-left space-y-2 text-xs">
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest text-center border-b border-amber-200 pb-1.5 mb-2">
                        OFFICIAL MOCK RECEIPT
                      </p>
                      <div className="flex justify-between">
                        <span>Items Count:</span>
                        <span className="font-bold font-mono">{totalItemsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Code:</span>
                        <span className="font-mono text-[#E4002B] font-bold">KFC-#{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone No:</span>
                        <span className="font-mono">{phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dest Address:</span>
                        <span className="font-semibold max-w-[180px] text-right truncate" title={address}>{address}</span>
                      </div>
                      <div className="border-t border-dashed border-amber-300 pt-1.5 mt-1.5 flex justify-between text-sm">
                        <span className="font-bold text-gray-800">Grand Total Paid:</span>
                        <span className="font-black font-mono text-[#E4002B]">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleResetCheckout}
                      className="mt-8 w-full bg-[#1A1A1A] hover:bg-black text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Return and Order More
                    </button>
                  </div>
                )}

              </div>

              {/* Sticky bottom summary of values (visible for cart mode) */}
              {cart.length > 0 && checkoutStep === 'cart' && (
                <div className="bg-gray-50 border-t border-gray-100 p-5 mt-auto space-y-3.5">
                  <div className="space-y-1.5 text-xs text-gray-650">
                    <div className="flex justify-between">
                      <span>Bucket Subtotal:</span>
                      <span className="font-mono text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Coupon Savings ({appliedPromo?.code}):</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Sales Tax (8%):</span>
                      <span className="font-mono text-gray-900">${salesTax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Delivery Fee:</span>
                      {subtotal > 25 ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                          FREE Over $25
                        </span>
                      ) : (
                        <span className="font-mono text-gray-900">${deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200/80 pt-3.5 flex justify-between items-center">
                    <span className="text-sm font-extrabold text-gray-900 uppercase">Total:</span>
                    <span className="text-xl font-black text-[#E4002B] font-mono">${finalTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full bg-[#E4002B] hover:bg-red-700 text-white py-3.5 font-bold rounded-xl text-xs uppercase tracking-widest text-center block shadow-lg transition-transform active:scale-98 cursor-pointer mt-2"
                  >
                    Proceed To Delivery
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
