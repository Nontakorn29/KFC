/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Branch, Promotion } from './types';

// Let's resolve the exact generated image file paths.
export const HERO_IMAGE = '/src/assets/images/kfc_hero_chicken_1779339081857.png';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Classic Crispy Fried Chicken Bucket',
    category: 'Chicken',
    description: 'Freshly prepared, hand-breaded crispy fried chicken pieces made with the Colonel’s secret blend of 11 herbs and spices.',
    price: 18.99,
    image: '/src/assets/images/kfc_chicken_bucket_1779339116977.png',
    isBestSeller: true,
    calories: 1240,
  },
  {
    id: 'm2',
    name: 'Spicy Zinger Tower Burger',
    category: 'Burgers',
    description: 'Extra crispy double-fried spicy chicken breast, melted cheddar cheese, crunchy hashbrown, crisp lettuce, and creamy mayonnaise in a toasted sesame bun.',
    price: 8.99,
    image: '/src/assets/images/kfc_zinger_burger_1779339100778.png',
    isBestSeller: true,
    calories: 780,
  },
  {
    id: 'm3',
    name: 'Fiery Hot & Spicy Chicken Wings',
    category: 'Chicken',
    description: 'Hot wing drumettes and wings tossed in our signature crunch coating with hot chili sprinkle and spicy glaze.',
    price: 7.49,
    image: '/src/assets/images/kfc_hot_wings_1779339134705.png',
    isBestSeller: true,
    calories: 450,
  },
  {
    id: 'm4',
    name: 'Sea-Salted Golden French Fries',
    category: 'Sides',
    description: 'Crispy skin-on golden french fries, fried to perfect crispness and lightly seasoned with standard sea salt.',
    price: 3.49,
    image: '/src/assets/images/kfc_french_fries_1779339149730.png',
    isBestSeller: true,
    calories: 320,
  },
  {
    id: 'm5',
    name: 'Iced Krushers Refreshing Punch',
    category: 'Drinks',
    description: 'Carbonated cold soft drink with premium syrup infusion, served ice-cold with heavy bubbles and an energizing chilled squeeze.',
    price: 2.49,
    image: '/src/assets/images/kfc_krushers_drink_1779339168893.png',
    isBestSeller: true,
    calories: 150,
  },
  {
    id: 'm6',
    name: 'All-In-One Ultimate Combo Box',
    category: 'Combos',
    description: 'The heavyweight satisfaction choice. Crispy chicken burger, one piece of original chicken, standard fries, dips, and a chilled soft drink.',
    price: 12.99,
    image: '/src/assets/images/kfc_combo_meal_1779339189873.png',
    isBestSeller: true,
    calories: 1100,
  },
  // Additional items to make the filtering experience incredible when clicking categories!
  {
    id: 'm7',
    name: 'Cheesy BBQ Zinger Burger',
    category: 'Burgers',
    description: 'Crispy chicken fillet with smoked BBQ sauce, double cheese slices, and fresh lettuce in an artisanal bun.',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    isBestSeller: false,
    calories: 690,
  },
  {
    id: 'm8',
    name: 'Mashed Potato Gravy Cup',
    category: 'Sides',
    description: 'Smooth, creamy whipped potato hot cup topped with our rich, signature savory herb gravy sauce.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=400',
    isBestSeller: false,
    calories: 140,
  },
  {
    id: 'm9',
    name: 'Creamy Coleslaw Tub',
    category: 'Sides',
    description: 'Finely shredded cabbage, carrots, onion dressed with sweet, tangy creamy buttermilk, freshly prepared.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1546793665-c7468128a1c8?auto=format&fit=crop&q=80&w=400',
    isBestSeller: false,
    calories: 130,
  },
  {
    id: 'm10',
    name: 'Sparkling Lemon Krusher Extra',
    category: 'Drinks',
    description: 'Fresh sparkling lemonade with crushed ice chunks, fresh zesty lime pulp, mint notes, and sweet soda burst.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
    isBestSeller: false,
    calories: 180,
  },
  {
    id: 'm11',
    name: 'Family Feast Bucket Combo',
    category: 'Combos',
    description: 'Great for groups: 8 pieces of crispy fried chicken, 2 medium fries, 2 signature coleslaws, and a large Pepsi bottle.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
    isBestSeller: false,
    calories: 2400,
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    title: 'Super Buckets Extravaganza',
    discount: 'Buy 1 Get 1 Free',
    tagline: 'Double your bite, keep the wallet light!',
    description: 'Order any 10-piece Giant Chicken Bucket and receive a 6-piece Crispy Wings Box absolutely FREE.',
    expiryTime: 3 * 3600 + 45 * 60, // 3h 45m countdown dur
    code: 'BOGOPOWER',
    bgColor: 'from-red-600 to-amber-600',
    badge: 'Limited Time Deal',
  },
  {
    id: 'p2',
    title: 'Afternoon Burger Bonanza',
    discount: 'Flat 30% OFF',
    tagline: 'Beating the afternoon slump with a Zinger crush!',
    description: 'Get 30% off any premium Burger or Combo box between Monday to Friday, 2:00 PM - 5:00 PM.',
    expiryTime: 1 * 3600 + 15 * 60, // 1h 15m countdown dur
    code: 'ZINGER30',
    bgColor: 'from-amber-500 to-red-600',
    badge: 'Today’s Hot Special',
  },
  {
    id: 'p3',
    title: 'Cheesy Fries Mega Feast',
    discount: 'Only $4.99 Meal Add',
    tagline: 'Douse everything in premium hot golden cheese!',
    description: 'Add standard premium cheesy French Fries and draft Krusher Cola drink for only $4.99 with any order.',
    expiryTime: 5 * 3600 + 10 * 60, // 5h 10m countdown dur
    code: 'CHEESYCRUSH',
    bgColor: 'from-yellow-400 to-red-500',
    badge: 'Craving Combo Spark',
  },
];

export const BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'KFC Downtown Core',
    address: '425 Broad Street, Downtown Plaza, Suit #110',
    hours: '11:00 AM - 11:00 PM',
    phone: '+1 (555) 723-9021',
    lat: 38.5, // Used for SVG placement
    lng: 40.2,
    dineIn: true,
    driveThru: false,
    delivery: true,
  },
  {
    id: 'b2',
    name: 'KFC Metro Central Drive-Thru',
    address: '891 Grand Boulevard, near Metro Highway Exit 9',
    hours: '10:00 AM - 12:00 AM (Midnight)',
    phone: '+1 (555) 321-4890',
    lat: 62.1,
    lng: 25.8,
    dineIn: true,
    driveThru: true,
    delivery: true,
  },
  {
    id: 'b3',
    name: 'KFC Ocean Breeze Highway',
    address: '15 Coast Drive Road, Waterfront Boulevard',
    hours: '11:00 AM - 10:00 PM',
    phone: '+1 (555) 890-2134',
    lat: 25.7,
    lng: 78.4,
    dineIn: true,
    driveThru: true,
    delivery: false,
  },
  {
    id: 'b4',
    name: 'KFC Highstreet Mall Express',
    address: 'Level 2 Food Court, Highstreet Shopping Galleria',
    hours: '10:00 AM - 09:30 PM',
    phone: '+1 (555) 543-9821',
    lat: 48.9,
    lng: 60.1,
    dineIn: true,
    driveThru: false,
    delivery: true,
  }
];
