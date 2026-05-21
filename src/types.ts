/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'Chicken' | 'Burgers' | 'Sides' | 'Drinks' | 'Combos';
  description: string;
  price: number;
  image: string;
  isBestSeller: boolean;
  calories?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  lat: number; // For interactive SVG map placement (percentage based or x,y)
  lng: number;
  dineIn: boolean;
  driveThru: boolean;
  delivery: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  discount: string;
  tagline: string;
  description: string;
  expiryTime: number; // timestamp or duration
  code: string;
  bgColor: string;
  badge: string;
}

export interface RewardStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}
