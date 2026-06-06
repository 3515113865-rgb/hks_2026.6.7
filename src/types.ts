/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenPath =
  | 'douyin'          // Immersive short-video (Douyin/TikTok style) landing screen
  | 'home'           // Home tab showing "看见" and recommended list
  | 'analysis'       // HUD Vision tracking active scan mode
  | 'loading'        // AI "Generating manual..." progress sequence
  | 'manual-action'  // Action manual: jump smash biomechanics analysis
  | 'manual-equip'   // Equipment manual: Astrox 100ZZ rating and specifications
  | 'purchase'       // Recommended merchandise pairings: Set A (offensive) & B (control)
  | 'growth-map'     // My personalized Growth Map visualization node-tree
  | 'manuals'        // Manuals list index tab
  | 'shoot-entrance' // Bento grid entrance sheet for filming motion/gear/combats
  | 'shoot-camera-guide' // Dashed frame alignment camera coach session
  | 'watch-ask'      // Watch and voice ask live-analysis page
  | 'profile';       // User profile and diagnostic options page

export interface ManualItem {
  id: string;
  title: string;
  category: 'action' | 'equipment' | 'match';
  categoryLabel: string;
  date: string;
  excerpt: string;
  badge: string;
  image: string;
}

export interface TrainingDrills {
  id: string;
  title: string;
  duration: string;
  badge: string;
  image: string;
}
