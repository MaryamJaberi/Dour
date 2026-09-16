import React from 'react';
import { GameSettings, TeamColor } from '../types';
import { COLORS_MAP } from '../constants';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { sound } from '../soundManager';
import { Users, HelpCircle, ArrowRight, ArrowLeft, Zap, Sparkles } from 'lucide-react';

interface Props {
  settings: GameSettings;
  onSave: (s: GameSettings) => void;
  onStart: () => void;
  onBack: () => void;
  onOpenHelp: () => void;
}

const PlayerNameScreen: React.FC<Props> = ({ settings, onSave, onStart, onBack, onOpenHelp }) => {
  const t = TRANSLATIONS[settings.language];
  const isRTL = settings.language === 'fa' || settings.language === 'ar';
  
  const getTeamColor = (index: number): TeamColor => {
    const teamIndex = index % (settings.playerCount / 2);
    return Object.values(TeamColor)[teamIndex];
  };

  const updateName = (index: number, name: string) => {
    const names = [...settings.playerNames];
    names[index] = name;
    onSave({ ...settings, playerNames: names });
  };

  const isReady = settings.playerNames.slice(0, settings.playerCount).every(n => n.trim().length > 0);

  const labelColorText = (color: TeamColor) => {
    return t.teamNames[color] || color;
  };

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col p-3.5 sm:p-4 select-none overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Party & Co SHOCK YOU! style */}
      <div className="flex items-center justify-between mb-2.5 bg-gradient-to-r from-[#7B2CBF] via-[#FF007F] to-[#FF2E93] text-white p-3 border-[3.5px] border-[#241442] rounded-2xl shadow-[4px_4px_0px_0px_#241442] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833] shadow-[1px_1px_0px_0px_#241442]">
            <Users size={18} color="#1a0833" />
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">{t.playerNames}</h2>
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

      <p className="text-[#1a0833] text-[11px] font-black mb-2.5 bg-white p-2 border-2 border-[#241442] rounded-xl shadow-[2px_2px_0px_0px_#241442] text-center flex items-center justify-center gap-1.5 shrink-0" dir={isRTL ? 'rtl' : 'ltr'}>
        <Sparkles size={14} color="#00F0FF" />
        <span>{t.namesHint}</span>
      </p>

      {/* Players Input Form */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1 space-y-2.5 pb-2 overscroll-contain">
        {Array.from({ length: settings.playerCount }).map((_, i) => {
          const color = getTeamColor(i);
          const colorConfig = COLORS_MAP[color];
          
          return (
            <div key={i} className="flex items-center gap-3 bg-white p-3 border-[3.5px] border-[#241442] rounded-2xl shadow-[3px_3px_0px_0px_#241442]">
              {/* Mascot & Number Badge */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <TeamMascot color={color} size={40} animate={false} />
                <div className={`mt-0.5 px-2 py-0.5 rounded-lg text-[9px] font-black border-2 border-[#241442] ${colorConfig.bg} ${colorConfig.text} shadow-[1px_1px_0px_0px_#241442] uppercase`}>
                  #{i + 1} {labelColorText(color)}
                </div>
              </div>

              {/* Name Input Box */}
              <input 
                type="text" 
                maxLength={14}
                placeholder={`${t.players} ${i + 1}`}
                value={settings.playerNames[i]}
                onChange={(e) => updateName(i, e.target.value)}
                className="flex-1 p-2.5 bg-[#F8EFFF] border-2 border-[#241442] rounded-xl focus:bg-white focus:outline-none transition-all font-black text-sm text-[#1a0833]"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
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
            if (isReady) {
              sound.playStartGame();
              onStart();
            }
          }} 
          disabled={!isReady}
          className={`pixel-btn flex-[2] py-3.5 text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 ${
            isReady ? 'pixel-btn-lime text-[#1a0833]' : 'disabled'
          }`}
        >
          <span>{t.start}</span>
          <Zap size={18} color={isReady ? '#1a0833' : '#475569'} fill={isReady ? '#1a0833' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default PlayerNameScreen;
