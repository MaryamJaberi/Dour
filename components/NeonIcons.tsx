import React from 'react';
import { 
  Zap, 
  Trophy, 
  Gamepad2, 
  BookOpen, 
  Sparkles, 
  Crown, 
  PartyPopper, 
  Clock, 
  Volume2, 
  VolumeX, 
  Users, 
  Layers, 
  Flame, 
  Skull, 
  Smartphone, 
  Check, 
  RotateCcw, 
  Shuffle, 
  HelpCircle, 
  Sliders, 
  History, 
  LogOut, 
  LogIn, 
  CloudCheck,
  Award,
  CircleDot,
  Lightbulb,
  Tag,
  Utensils,
  Dog,
  Briefcase,
  MapPin,
  Car,
  Smile,
  Activity,
  Tv,
  Cpu
} from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  glow?: boolean;
}

export const NeonLightning: React.FC<IconProps> = ({ size = 20, className = '', color = '#FFE600', glow = false }) => (
  <Zap 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(255,230,0,0.8)]' : ''}`} 
    color={color} 
    fill={color} 
  />
);

export const NeonTrophy: React.FC<IconProps> = ({ size = 22, className = '', color = '#FFE600', glow = false }) => (
  <Trophy 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(255,230,0,0.8)]' : ''}`} 
    color={color} 
    fill={`${color}33`} 
  />
);

export const NeonGamepad: React.FC<IconProps> = ({ size = 22, className = '', color = '#FF007F', glow = false }) => (
  <Gamepad2 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(255,0,127,0.8)]' : ''}`} 
    color={color} 
  />
);

export const NeonBook: React.FC<IconProps> = ({ size = 20, className = '', color = '#00F0FF', glow = false }) => (
  <BookOpen 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]' : ''}`} 
    color={color} 
  />
);

export const NeonSparkle: React.FC<IconProps> = ({ size = 20, className = '', color = '#00F0FF', glow = false }) => (
  <Sparkles 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]' : ''}`} 
    color={color} 
    fill={`${color}33`} 
  />
);

export const NeonCrown: React.FC<IconProps> = ({ size = 22, className = '', color = '#FFE600', glow = false }) => (
  <Crown 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(255,230,0,0.8)]' : ''}`} 
    color={color} 
    fill={color} 
  />
);

export const NeonClock: React.FC<IconProps> = ({ size = 20, className = '', color = '#00F0FF', glow = false }) => (
  <Clock 
    size={size} 
    className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]' : ''}`} 
    color={color} 
  />
);

export const NeonVolume: React.FC<IconProps & { muted?: boolean }> = ({ size = 20, className = '', color = '#39FF14', glow = false, muted = false }) => (
  muted ? (
    <VolumeX size={size} className={`${className}`} color="#FF4A6E" />
  ) : (
    <Volume2 size={size} className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(57,255,20,0.8)]' : ''}`} color={color} />
  )
);

export const NeonUsers: React.FC<IconProps> = ({ size = 20, className = '', color = '#00F0FF' }) => (
  <Users size={size} className={className} color={color} />
);

export const NeonSliders: React.FC<IconProps> = ({ size = 20, className = '', color = '#FFE600' }) => (
  <Sliders size={size} className={className} color={color} />
);

export const NeonHistory: React.FC<IconProps> = ({ size = 20, className = '', color = '#00F0FF' }) => (
  <History size={size} className={className} color={color} />
);

export const NeonShuffle: React.FC<IconProps> = ({ size = 20, className = '', color = '#00F0FF' }) => (
  <Shuffle size={size} className={className} color={color} />
);

export const NeonPhone: React.FC<IconProps> = ({ size = 20, className = '', color = '#FFE600' }) => (
  <Smartphone size={size} className={className} color={color} />
);

export const NeonFlame: React.FC<IconProps> = ({ size = 20, className = '', color = '#FFE600' }) => (
  <Flame size={size} className={className} color={color} fill={`${color}44`} />
);

export const NeonSkull: React.FC<IconProps> = ({ size = 20, className = '', color = '#FF1058' }) => (
  <Skull size={size} className={className} color={color} />
);

export const NeonCategoryIcon: React.FC<{ catKey: string; size?: number; className?: string }> = ({ catKey, size = 22, className = '' }) => {
  switch (catKey) {
    case 'CAT_OBJECTS':
      return <Layers size={size} className={className} color="#FFE600" />;
    case 'CAT_FOOD':
      return <Utensils size={size} className={className} color="#FF007F" />;
    case 'CAT_ANIMALS':
      return <Dog size={size} className={className} color="#39FF14" />;
    case 'CAT_JOBS':
      return <Briefcase size={size} className={className} color="#00F0FF" />;
    case 'CAT_PLACES':
      return <MapPin size={size} className={className} color="#FF4A9E" />;
    case 'CAT_VEHICLES':
      return <Car size={size} className={className} color="#00F0FF" />;
    case 'CAT_FEELINGS':
      return <Smile size={size} className={className} color="#FFE600" />;
    case 'CAT_SPORTS':
      return <Activity size={size} className={className} color="#39FF14" />;
    case 'CAT_TECH':
      return <Cpu size={size} className={className} color="#00F0FF" />;
    case 'CAT_ENTERTAINMENT':
      return <Tv size={size} className={className} color="#FF007F" />;
    case 'CAT_ADJECTIVES':
      return <Tag size={size} className={className} color="#FFE600" />;
    default:
      return <Sparkles size={size} className={className} color="#00F0FF" />;
  }
};
