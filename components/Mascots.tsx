import React from 'react';
import { TeamColor } from '../types';

interface MascotProps {
  color?: TeamColor | 'PARTY';
  className?: string;
  size?: number | string;
  animate?: boolean;
}

export const TeamMascot: React.FC<MascotProps> = ({ color = TeamColor.Blue, className = '', size = 72, animate = true }: MascotProps) => {
  const isPartyAnimate = animate ? 'animate-party-float' : '';

  switch (color) {
    case TeamColor.Blue:
      /* BLUE TEAM: Glowing Neon Cyan Aquatic Buddy (Image 2 Neon Style) */
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={`${isPartyAnimate} ${className} drop-shadow-[0_0_8px_rgba(0,240,255,0.75)]`}
        >
          {/* Water Spout Neon Fountain */}
          <path d="M48,16 Q50,4 40,4 Q48,10 48,16" fill="none" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />
          <path d="M52,16 Q54,4 62,4 Q54,10 52,16" fill="none" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="4" r="2" fill="#FFE600" stroke="#FFE600" />
          <circle cx="62" cy="4" r="2" fill="#FFE600" stroke="#FFE600" />

          {/* Neon Tube Round Body */}
          <circle cx="50" cy="54" r="33" fill="#001830" stroke="#00F0FF" strokeWidth="4" />
          {/* Inner Glowing Tube Belly */}
          <ellipse cx="50" cy="64" rx="20" ry="12" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 2" />

          {/* Glowing Neon Flippers */}
          <path d="M17,54 Q10,58 18,66" fill="none" stroke="#00F0FF" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M83,54 Q90,58 82,66" fill="none" stroke="#00F0FF" strokeWidth="3.5" strokeLinecap="round" />

          {/* Radiant Neon Eyes */}
          <circle cx="38" cy="46" r="6" fill="#00F0FF" />
          <circle cx="36" cy="44" r="2" fill="#FFFFFF" />
          <circle cx="62" cy="46" r="6" fill="#00F0FF" />
          <circle cx="60" cy="44" r="2" fill="#FFFFFF" />

          {/* Neon Pink Cheeks */}
          <ellipse cx="28" cy="54" rx="4" ry="2.5" fill="#FF007F" stroke="#FF007F" />
          <ellipse cx="72" cy="54" rx="4" ry="2.5" fill="#FF007F" stroke="#FF007F" />

          {/* Cute Neon Open Smile */}
          <path d="M44,54 Q50,62 56,54" fill="none" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case TeamColor.Red:
      /* RED TEAM: Glowing Neon Hot Pink-Red Flame Monster */
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={`${isPartyAnimate} ${className} drop-shadow-[0_0_8px_rgba(255,16,88,0.75)]`}
        >
          {/* Glowing Neon Flame Antenna */}
          <path d="M38,22 C32,8 42,4 46,12 C50,4 58,8 52,22 Z" fill="#FFE60022" stroke="#FFE600" strokeWidth="3" strokeLinejoin="round" />

          {/* Neon Tube Red Body */}
          <circle cx="50" cy="54" r="33" fill="#2D0014" stroke="#FF1058" strokeWidth="4" />

          {/* Glowing Little Feet */}
          <ellipse cx="36" cy="85" rx="6" ry="4" fill="none" stroke="#FF1058" strokeWidth="3" />
          <ellipse cx="64" cy="85" rx="6" ry="4" fill="none" stroke="#FF1058" strokeWidth="3" />

          {/* Glowing Expressive Neon Eyes */}
          <ellipse cx="38" cy="46" rx="7" ry="8" fill="#FFFFFF" stroke="#FF1058" strokeWidth="2.5" />
          <circle cx="39" cy="46" r="4" fill="#FF1058" />
          <circle cx="37" cy="44" r="1.5" fill="#FFFFFF" />

          <ellipse cx="62" cy="46" rx="7" ry="8" fill="#FFFFFF" stroke="#FF1058" strokeWidth="2.5" />
          <circle cx="61" cy="46" r="4" fill="#FF1058" />
          <circle cx="59" cy="44" r="1.5" fill="#FFFFFF" />

          {/* Playful Cheerful Brows */}
          <path d="M30,34 Q38,36 44,32" fill="none" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
          <path d="M70,34 Q62,36 56,32" fill="none" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />

          {/* Glowing Wide Smile with Tongue */}
          <path d="M42,56 Q50,68 58,56" fill="#2D0014" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="61" r="2.5" fill="#FF1058" />

          {/* Neon Yellow Cheeks */}
          <circle cx="28" cy="54" r="3.5" fill="#FFE600" />
          <circle cx="72" cy="54" r="3.5" fill="#FFE600" />
        </svg>
      );

    case TeamColor.Green:
      /* GREEN TEAM: Glowing Neon Emerald/Lime Froggy */
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={`${isPartyAnimate} ${className} drop-shadow-[0_0_8px_rgba(57,255,20,0.75)]`}
        >
          {/* Glowing Top Eyeball Arcs */}
          <circle cx="32" cy="30" r="13" fill="#00240D" stroke="#39FF14" strokeWidth="3.5" />
          <circle cx="68" cy="30" r="13" fill="#00240D" stroke="#39FF14" strokeWidth="3.5" />

          {/* Glowing Neon Pupils */}
          <circle cx="32" cy="30" r="7" fill="#39FF14" />
          <circle cx="30" cy="28" r="2.5" fill="#FFFFFF" />
          <circle cx="68" cy="30" r="7" fill="#39FF14" />
          <circle cx="66" cy="28" r="2.5" fill="#FFFFFF" />

          {/* Frog Body Tube */}
          <ellipse cx="50" cy="56" rx="35" ry="25" fill="#00240D" stroke="#39FF14" strokeWidth="4" />
          {/* Inner Light Belly Arc */}
          <ellipse cx="50" cy="63" rx="20" ry="12" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="3 3" />

          {/* Super Happy Wide Neon Smile */}
          <path d="M28,52 Q50,74 72,52" fill="none" stroke="#39FF14" strokeWidth="3.5" strokeLinecap="round" />

          {/* Neon Pink Cheeks */}
          <ellipse cx="26" cy="52" rx="4.5" ry="3" fill="#FF007F" stroke="#FF007F" />
          <ellipse cx="74" cy="52" rx="4.5" ry="3" fill="#FF007F" stroke="#FF007F" />

          {/* Glowing Leaf on Head */}
          <path d="M50,18 C44,10 50,4 50,4 C50,4 56,10 50,18 Z" fill="#FFE600" stroke="#FFE600" strokeWidth="2" />
        </svg>
      );

    case TeamColor.Yellow:
      /* YELLOW TEAM: Glowing Neon Golden-Yellow Star Creature */
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={`${isPartyAnimate} ${className} drop-shadow-[0_0_8px_rgba(255,230,0,0.75)]`}
        >
          {/* Glowing Crown / Head Spike */}
          <path d="M46,20 C42,10 48,6 50,12 C52,6 58,10 54,20 Z" fill="#FFE60022" stroke="#FFE600" strokeWidth="3" />

          {/* Glowing Neon Star Body */}
          <circle cx="50" cy="54" r="33" fill="#2B2000" stroke="#FFE600" strokeWidth="4" />

          {/* Glowing Tiny Neon Wings */}
          <path d="M18,54 Q10,48 16,62" fill="none" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
          <path d="M82,54 Q90,48 84,62" fill="none" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />

          {/* Big Kawaii Neon Sparkle Eyes */}
          <circle cx="38" cy="46" r="6" fill="#FFE600" />
          <circle cx="36" cy="44" r="2" fill="#FFFFFF" />
          <circle cx="62" cy="46" r="6" fill="#FFE600" />
          <circle cx="60" cy="44" r="2" fill="#FFFFFF" />

          {/* Neon Cyan Cheeks */}
          <circle cx="28" cy="54" r="3.5" fill="#00F0FF" />
          <circle cx="72" cy="54" r="3.5" fill="#00F0FF" />

          {/* Cute Glowing Neon Beak / Smile */}
          <polygon points="46,52 54,52 50,58" fill="#FF7A00" stroke="#FF7A00" strokeWidth="2" />
        </svg>
      );

    case 'PARTY':
      /* MEGA PARTY NEON MASCOT (Image 2 ICONIC Neon Stories Style) */
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 120 120" 
          className={`${isPartyAnimate} ${className} drop-shadow-[0_0_12px_rgba(255,0,127,0.85)]`}
        >
          {/* Party Cone Hat Glowing Tubes */}
          <polygon points="60,6 40,44 80,44" fill="#200028" stroke="#FFE600" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="60" cy="6" r="5" fill="#FF007F" stroke="#FF007F" className="drop-shadow-[0_0_6px_#FF007F]" />
          <line x1="46" y1="32" x2="74" y2="32" stroke="#FF007F" strokeWidth="3" strokeLinecap="round" />
          <line x1="51" y1="20" x2="69" y2="20" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />

          {/* Main Glowing Neon Magenta Body */}
          <circle cx="60" cy="74" r="37" fill="#1C002B" stroke="#FF007F" strokeWidth="4" />

          {/* Futuristic Glowing Neon Visor / Glasses */}
          <rect x="34" y="58" width="52" height="18" rx="8" fill="#001830" stroke="#00F0FF" strokeWidth="3.5" className="drop-shadow-[0_0_6px_#00F0FF]" />
          {/* Visor Neon Glare Lines */}
          <line x1="40" y1="65" x2="52" y2="65" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="65" x2="76" y2="65" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />

          {/* Luminous Neon Smile */}
          <path d="M48,84 Q60,96 72,84" fill="none" stroke="#39FF14" strokeWidth="3.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_#39FF14]" />

          {/* Neon Floating Sparkles around mascot */}
          <circle cx="16" cy="40" r="3" fill="#FFE600" className="drop-shadow-[0_0_4px_#FFE600]" />
          <circle cx="104" cy="45" r="3" fill="#00F0FF" className="drop-shadow-[0_0_4px_#00F0FF]" />
          <circle cx="18" cy="85" r="2.5" fill="#39FF14" className="drop-shadow-[0_0_4px_#39FF14]" />
          <circle cx="102" cy="90" r="3" fill="#FFE600" className="drop-shadow-[0_0_4px_#FFE600]" />
        </svg>
      );
  }
};
