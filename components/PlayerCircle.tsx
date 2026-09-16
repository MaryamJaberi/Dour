import React from 'react';
import { Player, TeamColor } from '../types';
import { COLORS_MAP } from '../constants';

interface Props {
  players: Player[];
  activeIndex: number;
  eliminatedTeamIds: number[];
}

const PlayerCircle: React.FC<Props> = ({ players, activeIndex, eliminatedTeamIds }) => {
  const radius = 95;
  const centerX = 125;
  const centerY = 125;

  return (
    <div className="relative w-64 h-64 mx-auto select-none bg-white p-2 border-[3.5px] border-[#241c48] rounded-3xl shadow-[4px_4px_0px_0px_#241c48]">
      <svg width="240" height="240" viewBox="0 0 250 250" className="mx-auto">
        {/* Retro dotted tracking radial ring */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={radius} 
          fill="none" 
          stroke="#241c48" 
          strokeWidth="3" 
          strokeDasharray="6,8" 
          className="opacity-40"
        />
        
        {/* Circle Centers */}
        {players.map((p, i) => {
          const angle = (i * 360 / players.length - 90) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const isActive = i === activeIndex;
          const isEliminated = eliminatedTeamIds.includes(p.teamId);
          const config = COLORS_MAP[p.teamColor] || { bg: 'bg-slate-500', hex: '#64748b' };

          return (
            <g key={p.id} className="transition-all duration-300">
              
              {/* Pulsing Backglow for active turn */}
              {isActive && (
                <circle 
                  cx={x} cy={y} 
                  r={32} 
                  fill="none" 
                  stroke={config.hex} 
                  strokeWidth="3.5" 
                  className="animate-ping opacity-50"
                />
              )}

              {/* Main character head circle */}
              <circle 
                cx={x} cy={y} 
                r={isActive ? 25 : 19} 
                fill={isEliminated ? '#cbd5e1' : config.hex} 
                stroke="#241c48"
                strokeWidth="3"
                className={`${isActive ? 'filter drop-shadow-md' : ''} transition-all`}
              />

              {/* Mascot Features inside SVG circles */}
              {isEliminated ? (
                // ELIMINATED: Dizzy cross eyes
                <g opacity="0.6">
                  {/* Left X eye */}
                  <line x1={x - 4} y1={y - 4} x2={x - 1} y2={y - 1} stroke="#241c48" strokeWidth="2" />
                  <line x1={x - 1} y1={y - 4} x2={x - 4} y2={y - 1} stroke="#241c48" strokeWidth="2" />
                  {/* Right X eye */}
                  <line x1={x + 1} y1={y - 4} x2={x + 4} y2={y - 1} stroke="#241c48" strokeWidth="2" />
                  <line x1={x + 4} y1={y - 4} x2={x + 1} y2={y - 1} stroke="#241c48" strokeWidth="2" />
                  {/* Sad flat mouth */}
                  <line x1={x - 3} y1={y + 3} x2={x + 3} y2={y + 3} stroke="#241c48" strokeWidth="2" />
                </g>
              ) : (
                // ALIVE Mascot expressions
                <g>
                  {p.teamColor === TeamColor.Blue && (
                    <g>
                      {/* Happy eyes */}
                      <circle cx={x - 5} cy={y - 2} r="2.5" fill="#241c48" />
                      <circle cx={x + 5} cy={y - 2} r="2.5" fill="#241c48" />
                      {/* Smiling open mouth */}
                      <path d={`M ${x - 4} ${y + 3} Q ${x} ${y + 8} ${x + 4} ${y + 3}`} fill="#241c48" />
                    </g>
                  )}
                  {p.teamColor === TeamColor.Red && (
                    <g>
                      {/* Evil slanted eyebrows */}
                      <line x1={x - 7} y1={y - 6} x2={x - 2} y2={y - 3} stroke="#241c48" strokeWidth="2" />
                      <line x1={x + 7} y1={y - 6} x2={x + 2} y2={y - 3} stroke="#241c48" strokeWidth="2" />
                      {/* Eyes */}
                      <circle cx={x - 4} cy={y - 1} r="2.5" fill="#241c48" />
                      <circle cx={x + 4} cy={y - 1} r="2.5" fill="#241c48" />
                      {/* Grin */}
                      <path d={`M ${x - 4} ${y + 4} Q ${x} ${y + 7} ${x + 4} ${y + 4}`} fill="none" stroke="#241c48" strokeWidth="2" />
                    </g>
                  )}
                  {p.teamColor === TeamColor.Green && (
                    <g>
                      {/* Leaf stem */}
                      <line x1={x} y1={y - (isActive ? 25 : 19)} x2={x} y2={y - (isActive ? 29 : 23)} stroke="#241c48" strokeWidth="2" />
                      {/* Innocent dots */}
                      <circle cx={x - 5} cy={y - 1} r="2" fill="#241c48" />
                      <circle cx={x + 5} cy={y - 1} r="2" fill="#241c48" />
                      {/* Tiny mouth */}
                      <circle cx={x} cy={y + 4} r="1.5" fill="#241c48" />
                    </g>
                  )}
                  {p.teamColor === TeamColor.Yellow && (
                    <g>
                      {/* Dizzy spirals */}
                      <circle cx={x - 5} cy={y - 1} r="3" fill="#fff" stroke="#241c48" strokeWidth="1" />
                      <circle cx={x + 5} cy={y - 1} r="3" fill="#fff" stroke="#241c48" strokeWidth="1" />
                      <circle cx={x - 5} cy={y - 1} r="1" fill="#241c48" />
                      <circle cx={x + 5} cy={y - 1} r="1" fill="#241c48" />
                      {/* Tongue out mouth */}
                      <rect x={x - 1} y={y + 3} width="2" height="4" rx="2" fill="#ff007f" stroke="#241c48" strokeWidth="1" />
                    </g>
                  )}
                </g>
              )}

              {/* Player Label Name below the mascot face */}
              <text 
                x={x} y={y + (isActive ? 38 : 28)} 
                textAnchor="middle" 
                className={`text-[10px] font-black ${
                  isActive 
                  ? 'fill-[#241c48] filter drop-shadow-[1px_1px_0px_#fff]' 
                  : 'fill-slate-500'
                }`}
                style={{ fontFamily: 'Vazirmatn, sans-serif' }}
              >
                {p.name.slice(0, 9)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Decorative center clock or active visual inside the circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
        <div className="w-10 h-10 bg-indigo-50 border-2 border-[#241c48] rounded-xl flex items-center justify-center animate-spin shadow-sm" style={{ animationDuration: '40s' }}>
          <span className="text-xl">🔄</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCircle;
