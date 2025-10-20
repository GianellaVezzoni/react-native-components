import { TabItem } from './types';

export const DEFAULT_TABS: TabItem[] = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'search', icon: '🔍', label: 'Search' },
  { id: 'add', icon: '➕', label: 'Add' },
  { id: 'notifications', icon: '🔔', label: 'Alerts' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export const ANIMATION_CONFIG = {
  spring: { tension: 100, friction: 10 },
  timing: { duration: 300 },
  fast: { duration: 150 },
} as const;

