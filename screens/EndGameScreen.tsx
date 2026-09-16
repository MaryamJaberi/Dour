import React, { useEffect } from 'react';
import { Team, Player, TeamColor, Language } from '../types';
import { COLORS_MAP } from '../constants';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { sound } from '../soundManager';
import { Trophy, Crown, Sparkles, Zap, RotateCcw } from 'lucide-react';

interface Props {
  winners: Team[];
  players: Player[];
  onRestart: () => void;
  language: Language;
  isPoolExhausted?: boolean;
}

const EndGameScreen: React.FC<Props> = ({ winners, players, onRestart, language, isPoolExhausted }) => {
  const t = TRANSLATIONS[language];
  const isTie = winners.length > 1;
  const winnerColor = winners[0]?.color || TeamColor.Blue;
  const config = COLORS_MAP[winnerColor] || { bg: 'bg-[#00F0FF]', text: 'text-[#1a0833]', hex: '#00F0FF' };

  const isRTL = language === 'fa' || language === 'ar';

  useEffect(() => {
    sound.playWinner();
  }, []);

  function labelWinnerNames(teamId: number): string {
    return players.filter(p => p.teamId === teamId).map(p => p.name).join(' & ');
  }

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col items-center justify-between p-4 text-center select-none overflow-y-auto overscroll-contain" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Pool warning banner */}
      {isPoolExhausted && (
        <div className="mb-2 px-3.5 py-1.5 bg-[#FFE600] border-[2.5px] border-[#241442] text-[#1a0833] rounded-2xl font-black text-xs shadow-[2px_2px_0px_0px_#241442] flex items-center gap-2 shrink-0">
          <Zap size={15} color="#1a0833" fill="#1a0833" />
          <span>{t.wordsFinished}</span>
        </div>
      )}

      {/* Dazzling Trophy */}
      <div className="my-1 relative animate-bounce shrink-0">
        <div className="absolute -inset-3 bg-[#FFE600] rounded-full blur-xl opacity-40 animate-pulse"></div>
        <Trophy size={72} color="#FFE600" fill="#FFE600" className="drop-shadow-[0_0_10px_rgba(255,230,0,0.8)]" />
      </div>

      {/* Victory Header Card */}
      <div className="pixel-card-shock bg-gradient-to-br from-[#2f1857] via-[#48167d] to-[#6d1cb3] text-white p-4 w-full mb-2.5 border-[3.5px] border-[#241442] shadow-[5px_5px_0px_0px_#241442] rounded-3xl shrink-0">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles size={16} color="#00F0FF" />
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFE600] via-[#FF007F] to-[#00F0FF]">
            {isTie ? t.tie : winners.length === 1 ? t.winner : t.winners}
          </h1>
          <Sparkles size={16} color="#FFE600" />
        </div>
        <p className="text-[11px] text-[#00F0FF] font-black uppercase tracking-widest mt-0.5">
          {language === 'fa' ? '✨ رقابت پرهیجان با موفقیت به پایان رسید! ✨' : '✨ CHAMPIONS OF THE PARTY! ✨'}
        </p>
      </div>
      
      {/* Winning details card */}
      {!isTie && winners.length === 1 ? (
        <div 
          className="w-full bg-white p-4 rounded-3xl border-[3.5px] border-[#241442] shadow-[5px_5px_0px_0px_#241442] relative overflow-hidden shrink-0"
          style={{ borderColor: config.hex }}
        >
          <div className="absolute -right-2 top-0 opacity-20">
            <TeamMascot color={winnerColor} size={90} animate={false} />
          </div>

          <div 
            className={`text-lg font-black uppercase mb-2 ${config.text} py-1.5 px-4 rounded-2xl border-2 border-[#241442] inline-flex items-center gap-2 shadow-[3px_3px_0px_0px_#241442]`}
            style={{ backgroundColor: config.hex }}
          >
            <Crown size={18} color="#1a0833" />
            <span>{t.teamNames[winnerColor]}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 mt-1">
            {players.filter(p => p.teamId === winners[0].id).map(p => (
              <span key={p.id} className="text-sm sm:text-base font-black text-[#1a0833] bg-[#F8EFFF] border-2 border-[#241442] px-3.5 py-1.5 rounded-xl w-11/12 shadow-[2px_2px_0px_0px_#241442] flex items-center justify-center gap-2">
                <Crown size={15} color="#FF007F" />
                <span>{p.name}</span>
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* TIED SCORE CARDS */
        <div className="bg-white p-3.5 rounded-3xl border-[3.5px] border-[#241442] shadow-[5px_5px_0px_0px_#241442] w-full space-y-2.5 shrink-0">
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest">{t.winners}</div>
          {winners.map(w => {
            const configW = COLORS_MAP[w.color] || { bg: 'bg-[#00F0FF]', text: 'text-[#1a0833]', hex: '#00F0FF' };
            return (
              <div 
                key={w.id} 
                className="p-2.5 rounded-2xl border-[2.5px] border-[#241442] text-[#1a0833] font-bold flex items-center justify-between shadow-[2px_2px_0px_0px_#241442]"
                style={{ borderLeftWidth: '6px', borderLeftColor: configW.hex }}
              >
                <div className="flex items-center gap-2">
                  <TeamMascot color={w.color} size={28} animate={false} />
                  <span className="font-black truncate text-sm">{labelWinnerNames(w.id)}</span>
                </div>
                <span className="text-[10px] bg-[#39FF14] text-[#1a0833] border border-[#241442] px-2 py-0.5 rounded-lg font-black">
                  MUTUAL
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Celebrating mascot */}
      <div className="my-2 flex flex-col items-center shrink-0">
        <TeamMascot color="PARTY" size={70} className="animate-party-float" />
        <span className="text-[11px] text-[#1a0833] uppercase font-black tracking-widest mt-1 bg-white px-3 py-0.5 rounded-full border-2 border-[#241442] shadow-[2px_2px_0px_0px_#241442]">
          {language === 'fa' ? '🎈 تبریک به قهرمانان دورهمی!' : '🎉 GG WP! PARTY TIME!'}
        </span>
      </div>

      {/* Play Again button */}
      <button 
        type="button"
        onClick={() => {
          sound.playClick();
          onRestart();
        }}
        className="pixel-btn pixel-btn-pink w-full py-3.5 text-base font-black uppercase tracking-wider text-white flex items-center justify-center gap-2 shrink-0"
      >
        <RotateCcw size={18} />
        <span>{t.returnMenu}</span>
        <Zap size={18} color="#FFE600" fill="#FFE600" />
      </button>

    </div>
  );
};

export default EndGameScreen;
