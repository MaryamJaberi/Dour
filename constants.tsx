import { TeamColor } from './types';

export const COLORS_MAP: Record<TeamColor, { bg: string, text: string, hex: string, surface: string, border: string, glow: string }> = {
  [TeamColor.Blue]: { 
    bg: 'bg-[#00F0FF]', 
    text: 'text-[#1a0833]', 
    hex: '#00F0FF', 
    surface: '#001D3D', 
    border: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.7)'
  },
  [TeamColor.Red]: { 
    bg: 'bg-[#FF1058]', 
    text: 'text-white', 
    hex: '#FF1058', 
    surface: '#380016', 
    border: '#FF1058',
    glow: 'rgba(255, 16, 88, 0.7)'
  },
  [TeamColor.Green]: { 
    bg: 'bg-[#39FF14]', 
    text: 'text-[#1a0833]', 
    hex: '#39FF14', 
    surface: '#002B11', 
    border: '#39FF14',
    glow: 'rgba(57, 255, 20, 0.7)'
  },
  [TeamColor.Yellow]: { 
    bg: 'bg-[#FFE600]', 
    text: 'text-[#1a0833]', 
    hex: '#FFE600', 
    surface: '#332600', 
    border: '#FFE600',
    glow: 'rgba(255, 230, 0, 0.7)'
  },
};

// High-Energy Party & Co SHOCK YOU! Color Palette (Lightened 2 Shades)
export const UI_COLORS = {
  shockPink: '#FF007F',        // Hot Pink / Magenta
  shockYellow: '#FFE600',      // Electric Yellow
  shockCyan: '#00F0FF',        // Electric Turquoise / Sky
  shockPurple: '#7B2CBF',      // Electric Purple / Violet
  deepIndigo: '#241442',       // Lightened Navy / Indigo (2 shades lighter than pitch black)
  cardBackground: '#311b59',   // Dark card background
  darkBorder: '#241442',       // Bold Border Color
  neonLime: '#39FF14',         // Neon Lime Green
  dangerRed: '#FF2A6D',        // Neon Danger Red
};

// Use identifiers as keys for i18n lookup
export const CATEGORIES: Record<string, string[]> = {
  "CAT_OBJECTS": [],
  "CAT_FOOD": [],
  "CAT_ANIMALS": [],
  "CAT_JOBS": [],
  "CAT_PLACES": [],
  "CAT_VEHICLES": [],
  "CAT_FEELINGS": [],
  "CAT_SPORTS": [],
  "CAT_ADJECTIVES": [],
  "CAT_TECH": [],
  "CAT_ENTERTAINMENT": []
};
