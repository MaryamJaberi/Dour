import React, { useState, useEffect } from 'react';
import { GameHistoryEntry, TeamColor, Language } from '../types';
import { COLORS_MAP } from '../constants';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { sound } from '../soundManager';
import { auth, fetchUserMatchHistory } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Trophy, Crown, Zap, ArrowRight, ArrowLeft, Cloud, HardDrive, Calendar, Users } from 'lucide-react';

interface Props {
  language: Language;
  history: GameHistoryEntry[];
  onBack: () => void;
}

const HistoryScreen: React.FC<Props> = ({ language, history, onBack }) => {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'fa' || language === 'ar';
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cloudHistory, setCloudHistory] = useState<GameHistoryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local');
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsLoadingCloud(true);
        const cloudMatches = await fetchUserMatchHistory(user.uid);
        setCloudHistory(cloudMatches);
        setIsLoadingCloud(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const displayedHistory = activeTab === 'cloud' && currentUser ? cloudHistory : history;

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col bg-pixel-grid overflow-hidden select-none" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Panel */}
      <div className="p-3.5 bg-gradient-to-r from-[#7B2CBF] via-[#FF007F] to-[#FF2E93] border-b-4 border-[#241442] flex items-center justify-between z-10 text-white shadow-[0px_3px_0px_0px_#241442] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833] shadow-[1px_1px_0px_0px_#241442]">
            <Trophy size={18} color="#1a0833" />
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">{t.history}</h2>
        </div>
        <button 
          onClick={() => {
            sound.playClick();
            onBack();
          }} 
          className="px-3.5 py-1.5 flex items-center justify-center bg-[#FFE600] hover:bg-yellow-300 text-[#1a0833] border-2 border-[#241442] font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_#241442] active:translate-y-0.5"
        >
          {t.back}
        </button>
      </div>

      {/* Cloud / Local Tab Selector */}
      {currentUser && (
        <div className="flex gap-2 p-2 bg-white border-b-2 border-[#241442] shrink-0">
          <button
            onClick={() => { sound.playClick(); setActiveTab('local'); }}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border-2 border-[#241442] transition-all ${
              activeTab === 'local' 
                ? 'bg-[#00F0FF] text-[#1a0833] shadow-[2px_2px_0px_0px_#241442]' 
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <HardDrive size={14} />
            <span>{language === 'fa' ? 'سوابق این دستگاه' : 'Local Matches'} ({history.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('cloud'); }}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border-2 border-[#241442] transition-all ${
              activeTab === 'cloud' 
                ? 'bg-[#39FF14] text-[#1a0833] shadow-[2px_2px_0px_0px_#241442]' 
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Cloud size={14} />
            <span>{language === 'fa' ? 'سوابق ابری (Firestore)' : 'Cloud Matches'} ({cloudHistory.length})</span>
          </button>
        </div>
      )}

      {/* Scores Area */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3.5 space-y-2.5 overscroll-contain">
        {isLoadingCloud ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
            <div className="w-8 h-8 border-3 border-[#FF007F] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-black text-[#1a0833]">{language === 'fa' ? 'در حال بارگذاری از پایگاه داده فایربیس...' : 'Loading from Firebase Firestore...'}</p>
          </div>
        ) : displayedHistory.length === 0 ? (
          /* Empty scoreboard state */
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="animate-party-float">
              <TeamMascot color={TeamColor.Yellow} size={90} />
            </div>
            <div className="bg-white p-4 border-[3px] border-[#241442] rounded-2xl shadow-[3px_3px_0px_0px_#241442] max-w-xs">
              <span className="text-[10px] bg-[#FFE600] border border-[#241442] px-2 py-0.5 rounded-lg font-black uppercase text-[#1a0833]">
                ⚡ NO GAMES YET
              </span>
              <p className="text-xs font-black text-slate-700 mt-2">
                {t.noHistory || 'No games recorded yet.'}
              </p>
            </div>
          </div>
        ) : (
          /* High scores list */
          displayedHistory.map(entry => {
            const hasColorMatch = entry.winnerColor !== 'TIE';
            const winnerBg = hasColorMatch ? COLORS_MAP[entry.winnerColor as TeamColor]?.bg : 'bg-slate-400';
            const winnerHex = hasColorMatch ? COLORS_MAP[entry.winnerColor as TeamColor]?.hex : '#94a3b8';

            return (
              <div 
                key={entry.id} 
                className="bg-white p-3 rounded-2xl border-[3px] border-[#241442] shadow-[3px_3px_0px_0px_#241442] flex items-center justify-between gap-3 relative transition-all"
              >
                {/* Score listing details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-slate-600 tracking-wider mb-0.5 uppercase flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{entry.date}</span>
                  </div>
                  <div className="text-[#1a0833] font-black text-sm uppercase tracking-tight flex items-center gap-1.5">
                    <Crown size={15} color="#FF007F" />
                    <span className="truncate">{entry.winnerNames.join(' & ')}</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 truncate mt-0.5 flex items-center gap-1">
                    <Users size={12} />
                    <span>{t.players}: {entry.players.join(', ')}</span>
                  </div>
                </div>

                {/* Shield badge */}
                <div 
                  className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black text-[#1a0833] shadow-[2px_2px_0px_0px_#241442] border-2 border-[#241442] shrink-0 ${winnerBg}`}
                  style={{ backgroundColor: winnerHex }}
                >
                  <Trophy size={16} color="#1a0833" />
                  <span className="text-[8px] text-[#1a0833] font-black tracking-tighter uppercase leading-none mt-0.5">
                    {entry.winnerColor === 'TIE' ? 'TIE' : entry.winnerColor.slice(0, 4)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Return footer tab */}
      <div className="p-3 bg-white border-t-4 border-[#241442] z-10 shrink-0">
        <button 
          onClick={() => {
            sound.playClick();
            onBack();
          }} 
          className="pixel-btn pixel-btn-dark w-full py-3 text-base font-black uppercase tracking-wider flex items-center justify-center gap-2"
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{t.back}</span>
        </button>
      </div>
    </div>
  );
};

export default HistoryScreen;
