import React from 'react';
import { GameSettings, Team, Player, TeamColor } from '../types';
import { COLORS_MAP } from '../constants';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { sound } from '../soundManager';
import { HelpCircle, ArrowRight, ArrowLeft, Users, Zap, Sparkles } from 'lucide-react';

interface Props {
  settings: GameSettings;
  teams: Team[];
  players: Player[];
  onConfirm: () => void;
  onBack: () => void;
  onOpenHelp: () => void;
}

const SeatingConfirmScreen: React.FC<Props> = ({
  settings,
  teams,
  players,
  onConfirm,
  onBack,
  onOpenHelp
}) => {
  const t = TRANSLATIONS[settings.language];
  const isRTL = settings.language === 'fa' || settings.language === 'ar';
  const radius = 100;
  const centerX = 135;
  const centerY = 135;
  const teamCount = settings.playerCount / 2;

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col p-3.5 sm:p-4 select-none overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-2 bg-gradient-to-r from-[#7B2CBF] via-[#FF007F] to-[#FF2E93] text-white p-3 border-[3.5px] border-[#241442] rounded-2xl shadow-[4px_4px_0px_0px_#241442] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833] shadow-[1px_1px_0px_0px_#241442]">
            <Users size={18} color="#1a0833" />
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">
            {settings.language === 'fa' ? 'چیدمان دور میز' : 'Table Seating Guide'}
          </h2>
        </div>
        <button 
          onClick={() => {
            sound.playClick();
            onOpenHelp();
          }} 
          className="px-3 py-1.5 bg-[#FFE600] hover:bg-yellow-300 text-[#1a0833] border-2 border-[#241442] font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_#241442] transition-transform active:translate-y-0.5 flex items-center gap-1.5"
        >
          <HelpCircle size={15} color="#1a0833" />
          <span>{t.guide}</span>
        </button>
      </div>

      {/* Scrollable Content Container */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1 pb-2 space-y-2 overscroll-contain flex flex-col justify-between">
        
        {/* Seating Tip */}
        <div className="text-[11px] font-black text-[#1a0833] bg-white p-2 border-2 border-[#241442] rounded-xl text-center shadow-[2px_2px_0px_0px_#241442] flex items-center justify-center gap-1.5 shrink-0">
          <Sparkles size={14} color="#00F0FF" />
          <span>
            {settings.language === 'fa' 
              ? '🎯 هم‌تیمی‌ها دقیقاً روبروی هم می‌نشینند! چرخش نوبت ساعت‌گرد است.' 
              : '🎯 Teammates sit directly opposite each other! Rotation is clockwise.'}
          </span>
        </div>

        {/* Interactive Seating Circle SVG */}
        <div className="relative w-60 h-60 sm:w-68 sm:h-68 mx-auto select-none bg-white p-2 border-[3.5px] border-[#241442] rounded-3xl shadow-[4px_4px_0px_0px_#241442] my-auto flex items-center justify-center shrink-0">
          <svg width="240" height="240" viewBox="0 0 270 270" className="mx-auto">
            {/* Table Center */}
            <circle cx={centerX} cy={centerY} r="42" fill="#241442" stroke="#FF007F" strokeWidth="3" />
            <circle cx={centerX} cy={centerY} r="36" fill="#311b59" />
            <text 
              x={centerX} 
              y={centerY + 4} 
              textAnchor="middle" 
              fill="#FFE600" 
              className="text-[10px] font-black uppercase tracking-widest"
            >
              TABLE
            </text>

            {/* Dotted Seating Circle */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={radius} 
              fill="none" 
              stroke="#241442" 
              strokeWidth="3" 
              strokeDasharray="6,6" 
              className="opacity-30"
            />

            {/* Opposite Partner Lines */}
            {Array.from({ length: teamCount }).map((_, i) => {
              const angle1 = (i * 360 / settings.playerCount - 90) * (Math.PI / 180);
              const angle2 = ((i + teamCount) * 360 / settings.playerCount - 90) * (Math.PI / 180);
              const x1 = centerX + radius * Math.cos(angle1);
              const y1 = centerY + radius * Math.sin(angle1);
              const x2 = centerX + radius * Math.cos(angle2);
              const y2 = centerY + radius * Math.sin(angle2);
              const team = teams[i];
              const colorConfig = team ? COLORS_MAP[team.color] : { hex: '#00F0FF' };

              return (
                <line 
                  key={i} 
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke={colorConfig.hex} 
                  strokeWidth="3" 
                  strokeDasharray="4,4"
                  className="opacity-80"
                />
              );
            })}

            {/* Player Seats */}
            {players.map((p, i) => {
              const angle = (i * 360 / players.length - 90) * (Math.PI / 180);
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              const config = COLORS_MAP[p.teamColor] || { hex: '#00F0FF' };

              return (
                <g key={p.id}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="22" 
                    fill={config.hex} 
                    stroke="#241442" 
                    strokeWidth="3" 
                    className="shadow-md"
                  />
                  <text 
                    x={x} 
                    y={y - 2} 
                    textAnchor="middle" 
                    fill="#1a0833" 
                    className="text-[10.5px] font-black"
                  >
                    P{i + 1}
                  </text>
                  <text 
                    x={x} 
                    y={y + 11} 
                    textAnchor="middle" 
                    fill="#1a0833" 
                    className="text-[9px] font-black"
                    style={{ fontFamily: 'Vazirmatn, sans-serif' }}
                  >
                    {p.name.slice(0, 7)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Teams Roster Bar */}
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {teams.map(team => {
            const config = COLORS_MAP[team.color];
            const teamPlayers = players.filter(p => p.teamId === team.id);
            return (
              <div 
                key={team.id}
                className="bg-white p-2 rounded-xl border-[2.5px] border-[#241442] flex items-center gap-2 shadow-[2px_2px_0px_0px_#241442]"
                style={{ borderLeftWidth: '5px', borderLeftColor: config.hex }}
              >
                <TeamMascot color={team.color} size={26} animate={false} />
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-black text-slate-600 uppercase truncate">
                    {t.teamNames[team.color]}
                  </div>
                  <div className="text-[10.5px] font-black text-[#1a0833] truncate">
                    {teamPlayers.map(p => p.name).join(' ⚡ ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2 shrink-0 border-t-2 border-[#241442]/20">
        <button 
          onClick={() => {
            sound.playClick();
            onBack();
          }} 
          className="pixel-btn pixel-btn-dark flex-1 py-3.5 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{t.back}</span>
        </button>
        <button 
          onClick={() => {
            sound.playStartGame();
            onConfirm();
          }} 
          className="pixel-btn pixel-btn-lime flex-[2] py-3.5 text-base font-black uppercase tracking-wider text-[#1a0833] flex items-center justify-center gap-2"
        >
          <span>{settings.language === 'fa' ? 'شروع دور ۱' : 'Start Round 1'}</span>
          <Zap size={18} color="#1a0833" fill="#1a0833" />
        </button>
      </div>
    </div>
  );
};

export default SeatingConfirmScreen;
