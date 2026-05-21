/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Promotions from './components/Promotions';
import Locations from './components/Locations';
import LoyaltyRewards from './components/LoyaltyRewards';
import OrderNow from './components/OrderNow';
import Footer from './components/Footer';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  // Add Item to cart or increment its quantity if it already exists
  const handleAddToCart = (menuItem: MenuItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.menuItem.id === menuItem.id);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + 1,
        };
        return nextCart;
      } else {
        return [...prevCart, { menuItem, quantity: 1 }];
      }
    });
  };

  // Modify quantities or delete if the quantity goes down to 0
  const handleUpdateQuantity = (menuItemId: string, newQty: number) => {
    setCart((prevCart) => {
      if (newQty <= 0) {
        return prevCart.filter((item) => item.menuItem.id !== menuItemId);
      }
      return prevCart.map((item) => 
        item.menuItem.id === menuItemId ? { ...item, quantity: newQty } : item
      );
    });
  };

  // Wipe cart clean upon successful checkout
  const handleClearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Apply discounts based on coupon code
  const handleAddPromoDiscount = (discountVal: number, code: string) => {
    if (discountVal <= 0 || !code) {
      setAppliedPromo(null);
    } else {
      setAppliedPromo({ code, discount: discountVal });
    }
  };

  // Auto handle coupon selection inside promotion cards
  const handleGrabPromo = (code: string) => {
    // We register the code with a mock value
    let discountVal = 10;
    if (code === 'ZINGER35' || code === 'ZINGER30') discountVal = 30;
    if (code === 'BOGOPOWER') discountVal = 15;
    if (code === 'CHEESYCRUSH') discountVal = 10;

    handleAddPromoDiscount(discountVal, code);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-gray-900 overflow-x-hidden antialiased"
    >
      {/* 1. Sticky Navigation Bar */}
      <Navbar 
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onAddPromoDiscount={handleAddPromoDiscount}
        appliedPromo={appliedPromo}
      />

      {/* 2. Panoramic Impact Hero Banner */}
      <Hero />

      {/* 3. Interactive Menu Filter & List */}
      <Menu onAddToCart={handleAddToCart} />

      {/* 4. Bold Promotions & Live Countdowns */}
      <Promotions 
        onGrabPromo={handleGrabPromo} 
        appliedPromoCode={appliedPromo?.code}
      />

      {/* 5. Branch Locations Finder & Vector Map */}
      <Locations />

      {/* 6. Gold Loyalty Rewards & Points Claim */}
      <LoyaltyRewards />

      {/* 7. Dark Delivery Cross-Sell Shortcuts */}
      <OrderNow />

      {/* 8. Branded Licensing Footer */}
      <Footer />
    </motion.div>
  );
}
