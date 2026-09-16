import React from 'react';
import { GameSettings } from '../types';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { 
  NeonLightning, 
  NeonBook, 
  NeonSparkle, 
  NeonVolume, 
  NeonClock, 
  NeonUsers, 
  NeonSliders,
  NeonPhone,
  NeonFlame,
  NeonSkull 
} from '../components/NeonIcons';
import { sound } from '../soundManager';
import { Users, Flame, Zap, Skull, Sparkles, Clock, Phone, Volume2, VolumeX, Music, Bell, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  settings: GameSettings;
  onSave: (s: GameSettings) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenHelp: () => void;
}

const SetupScreen: React.FC<Props> = ({ settings, onSave, onNext, onBack, onOpenHelp }) => {
  const t = TRANSLATIONS[settings.language];
  const isRTL = settings.language === 'fa' || settings.language === 'ar';
  
  const updateSettings = (key: keyof GameSettings, value: any) => {
    onSave({ ...settings, [key]: value });
  };

  const difficulty = settings.difficulty || 'easy';

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col p-3.5 sm:p-4 select-none overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header with Party & Co SHOCK YOU! styling */}
      <div className="flex items-center justify-between mb-2.5 bg-gradient-to-r from-[#7B2CBF] via-[#FF007F] to-[#FF2E93] text-white p-3 border-[3.5px] border-[#241442] rounded-2xl shadow-[4px_4px_0px_0px_#241442] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#241442] shadow-[1px_1px_0px_0px_#241442]">
            <NeonSliders size={18} color="#241442" />
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">{t.setup}</h2>
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

      {/* Main Form Dashboard - Fully Scrollable with smooth touch */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1 pb-3 space-y-3 overscroll-contain">
        
        {/* Player Count */}
        <section className="bg-white p-3.5 sm:p-4 border-[3.5px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] rounded-2xl">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#00F0FF] border-2 border-[#241442] flex items-center justify-center text-[#1a0833]">
                <Users size={14} />
              </div>
              <label className="text-[#1a0833] text-xs font-black uppercase tracking-wider">{t.players}</label>
            </div>
            <span className="text-[10px] bg-[#FFE600] border-2 border-[#241442] text-[#1a0833] px-2 py-0.5 rounded-lg font-black">
              2 PLAYERS PER TEAM
            </span>
          </div>
          <div className="flex gap-2">
            {[4, 6, 8].map(count => {
              const isSelected = settings.playerCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    sound.playToggle();
                    updateSettings('playerCount', count);
                  }}
                  className={`pixel-btn flex-1 py-2.5 flex flex-col items-center justify-center font-black transition-all ${
                    isSelected 
                    ? 'pixel-btn-lime text-[#1a0833]' 
                    : 'pixel-btn-dark text-[#00F0FF]'
                  }`}
                >
                  <span className="text-sm sm:text-base font-black">{count} {t.players}</span>
                  <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-[#1a0833]' : 'text-slate-200'}`}>
                    ({count/2} {settings.language === 'fa' ? 'تیم' : 'Teams'})
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Word Difficulty Levels - AAA Contrast Guaranteed */}
        <section className="bg-white p-3.5 sm:p-4 border-[3.5px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] rounded-2xl">
          <div className="flex justify-between items-center mb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833]">
                  <Flame size={14} />
                </div>
                <label className="text-[#1a0833] text-xs font-black uppercase tracking-wider block">
                  {t.difficulty_title || (settings.language === 'fa' ? 'سطح سختی کلمات' : 'Word Difficulty')}
                </label>
              </div>
              <span className="text-[10px] text-slate-700 font-bold mt-0.5 block">
                {t.difficulty_hint || (settings.language === 'fa' ? 'تک‌کلمه‌ای، ترکیبی یا ضرب‌المثل‌ها' : 'Choose word complexity')}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 border-2 border-[#241442] font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_#241442] ${
              difficulty === 'easy' ? 'bg-[#39FF14] text-[#1a0833]' :
              difficulty === 'medium' ? 'bg-[#FFE600] text-[#1a0833]' :
              difficulty === 'hard' ? 'bg-[#FF1058] text-white' : 'bg-[#00F0FF] text-[#1a0833]'
            }`}>
              {difficulty === 'easy' ? (settings.language === 'fa' ? '🟢 آسان' : '🟢 Easy') :
               difficulty === 'medium' ? (settings.language === 'fa' ? '🟡 متوسط' : '🟡 Medium') :
               difficulty === 'hard' ? (settings.language === 'fa' ? '🔴 سخت' : '🔴 Hard') :
               (settings.language === 'fa' ? '🌈 ترکیبی' : '🌈 Mixed')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Easy (Level 1) */}
            <button
              type="button"
              onClick={() => {
                sound.playToggle();
                updateSettings('difficulty', 'easy');
              }}
              className={`pixel-btn p-3 flex flex-col items-start justify-between text-start rounded-2xl transition-all ${
                difficulty === 'easy'
                  ? 'bg-gradient-to-br from-[#5eff3b] to-[#39ff14] border-[3px] border-[#241442] text-[#1a0833] shadow-[3px_3px_0px_0px_#241442]'
                  : 'pixel-btn-dark'
              }`}
            >
              <div className="flex items-center gap-1 w-full justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Zap size={15} color={difficulty === 'easy' ? '#1a0833' : '#39FF14'} />
                  <span className={`font-black text-xs ${difficulty === 'easy' ? 'text-[#1a0833]' : 'text-[#39FF14]'}`}>
                    {t.difficultyLevels?.easy || 'آسان'}
                  </span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black border border-[#241442] ${
                  difficulty === 'easy' ? 'bg-[#241442] text-[#39FF14]' : 'bg-[#39FF14] text-[#1a0833]'
                }`}>
                  L1
                </span>
              </div>
              <span className={`text-[11px] font-black leading-tight mt-0.5 ${
                difficulty === 'easy' ? 'text-[#1a0833]' : 'text-slate-100'
              }`}>
                {t.difficultyDescs?.easy || (settings.language === 'fa' ? 'تک‌کلمه‌ای (لیوان، شیر، ماشین)' : 'Single words (Easy)')}
              </span>
            </button>

            {/* Medium (Level 2) */}
            <button
              type="button"
              onClick={() => {
                sound.playToggle();
                updateSettings('difficulty', 'medium');
              }}
              className={`pixel-btn p-3 flex flex-col items-start justify-between text-start rounded-2xl transition-all ${
                difficulty === 'medium'
                  ? 'bg-gradient-to-br from-[#fff033] to-[#ffe600] border-[3px] border-[#241442] text-[#1a0833] shadow-[3px_3px_0px_0px_#241442]'
                  : 'pixel-btn-dark'
              }`}
            >
              <div className="flex items-center gap-1 w-full justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Flame size={15} color={difficulty === 'medium' ? '#1a0833' : '#FFE600'} />
                  <span className={`font-black text-xs ${difficulty === 'medium' ? 'text-[#1a0833]' : 'text-[#FFE600]'}`}>
                    {t.difficultyLevels?.medium || 'متوسط'}
                  </span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black border border-[#241442] ${
                  difficulty === 'medium' ? 'bg-[#241442] text-[#FFE600]' : 'bg-[#FFE600] text-[#1a0833]'
                }`}>
                  L2
                </span>
              </div>
              <span className={`text-[11px] font-black leading-tight mt-0.5 ${
                difficulty === 'medium' ? 'text-[#1a0833]' : 'text-slate-100'
              }`}>
                {t.difficultyDescs?.medium || (settings.language === 'fa' ? 'کلمات ترکیبی ۲ کلمه‌ای' : 'Compound 2-Words')}
              </span>
            </button>

            {/* Hard (Level 3) */}
            <button
              type="button"
              onClick={() => {
                sound.playToggle();
                updateSettings('difficulty', 'hard');
              }}
              className={`pixel-btn p-3 flex flex-col items-start justify-between text-start rounded-2xl transition-all ${
                difficulty === 'hard'
                  ? 'bg-gradient-to-br from-[#ff2a6d] to-[#ff007f] border-[3px] border-[#241442] text-white shadow-[3px_3px_0px_0px_#241442]'
                  : 'pixel-btn-dark'
              }`}
            >
              <div className="flex items-center gap-1 w-full justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Skull size={15} color={difficulty === 'hard' ? '#FFFFFF' : '#FF5E97'} />
                  <span className={`font-black text-xs ${difficulty === 'hard' ? 'text-white' : 'text-[#FF5E97]'}`}>
                    {t.difficultyLevels?.hard || 'سخت'}
                  </span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black border border-[#241442] ${
                  difficulty === 'hard' ? 'bg-[#241442] text-[#FF007F]' : 'bg-[#FF007F] text-white'
                }`}>
                  L3
                </span>
              </div>
              <span className={`text-[11px] font-black leading-tight mt-0.5 ${
                difficulty === 'hard' ? 'text-yellow-100' : 'text-slate-100'
              }`}>
                {t.difficultyDescs?.hard || (settings.language === 'fa' ? 'عبارات و ضرب‌المثل‌ها' : 'Proverbs & Phrases')}
              </span>
            </button>

            {/* Mixed / All */}
            <button
              type="button"
              onClick={() => {
                sound.playToggle();
                updateSettings('difficulty', 'all');
              }}
              className={`pixel-btn p-3 flex flex-col items-start justify-between text-start rounded-2xl transition-all ${
                difficulty === 'all'
                  ? 'bg-gradient-to-br from-[#4de8ff] to-[#00f0ff] border-[3px] border-[#241442] text-[#1a0833] shadow-[3px_3px_0px_0px_#241442]'
                  : 'pixel-btn-dark'
              }`}
            >
              <div className="flex items-center gap-1 w-full justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={15} color={difficulty === 'all' ? '#1a0833' : '#00F0FF'} />
                  <span className={`font-black text-xs ${difficulty === 'all' ? 'text-[#1a0833]' : 'text-[#00F0FF]'}`}>
                    {t.difficultyLevels?.all || 'ترکیبی'}
                  </span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black border border-[#241442] ${
                  difficulty === 'all' ? 'bg-[#241442] text-[#00F0FF]' : 'bg-[#00F0FF] text-[#1a0833]'
                }`}>
                  ALL
                </span>
              </div>
              <span className={`text-[11px] font-black leading-tight mt-0.5 ${
                difficulty === 'all' ? 'text-[#1a0833]' : 'text-slate-100'
              }`}>
                {t.difficultyDescs?.all || (settings.language === 'fa' ? 'ترکیب تصادفی همه سطوح' : 'Random mix of all tiers')}
              </span>
            </button>
          </div>
        </section>

        {/* Rounds Count Slider */}
        <section className="bg-white p-3.5 sm:p-4 border-[3.5px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FF007F] border-2 border-[#241442] flex items-center justify-center text-white">
                <NeonLightning size={14} color="#FFE600" />
              </div>
              <label className="text-[#1a0833] text-xs font-black uppercase tracking-wider">{t.rounds}</label>
            </div>
            <span className="bg-[#FF007F] text-white px-3 py-0.5 border-2 border-[#241442] font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_#241442]">
              {settings.roundsCount} {t.round}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs font-bold text-slate-700">3</span>
            <input 
              type="range" min="3" max="10" step="1"
              value={settings.roundsCount}
              onChange={(e) => {
                sound.playClick();
                updateSettings('roundsCount', parseInt(e.target.value));
              }}
              className="w-full h-3 bg-[#F4E8FF] border-2 border-[#241442] rounded-lg appearance-none cursor-pointer accent-[#FF007F]"
              style={{ outline: 'none' }}
            />
            <span className="text-xs font-bold text-slate-700">10</span>
          </div>
        </section>

        {/* Round Duration Slider */}
        <section className="bg-white p-3.5 sm:p-4 border-[3.5px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#00F0FF] border-2 border-[#241442] flex items-center justify-center text-[#1a0833]">
                <Clock size={14} />
              </div>
              <label className="text-[#1a0833] text-xs font-black uppercase tracking-wider">{t.duration}</label>
            </div>
            <span className="bg-[#00F0FF] text-[#1a0833] px-3 py-0.5 border-2 border-[#241442] font-black text-xs rounded-xl shadow-[2px_2px_0px_0px_#241442]">
              {settings.roundDuration} {t.seconds}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs font-bold text-slate-700">60s</span>
            <input 
              type="range" min="60" max="300" step="15"
              value={settings.roundDuration}
              onChange={(e) => {
                sound.playClick();
                updateSettings('roundDuration', parseInt(e.target.value));
              }}
              className="w-full h-3 bg-[#F4E8FF] border-2 border-[#241442] rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              style={{ outline: 'none' }}
            />
            <span className="text-xs font-bold text-slate-700">300s</span>
          </div>
        </section>

        {/* Turn Transition Mode */}
        <section className="bg-white p-3.5 sm:p-4 border-[3.5px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833]">
                <Phone size={14} />
              </div>
              <label className="text-[#1a0833] text-xs font-black uppercase tracking-wider">
                {settings.language === 'fa' ? 'حالت تحویل نوبت' : 'Turn Passing Mode'}
              </label>
            </div>
            <span className="bg-[#FFE600] text-[#1a0833] px-2.5 py-0.5 border-2 border-[#241442] font-black text-[10px] rounded-xl shadow-[2px_2px_0px_0px_#241442]">
              {settings.passPhoneScreenEnabled
                ? (settings.language === 'fa' ? 'با صفحه تحویل گوشی' : 'Pass-Phone Screen')
                : (settings.language === 'fa' ? 'انتقال سریع و مستقیم ⚡' : 'Fast Hot-Potato ⚡')}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                sound.playToggle();
                updateSettings('passPhoneScreenEnabled', false);
              }}
              className={`pixel-btn py-2.5 px-2 text-xs font-black uppercase flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${
                !settings.passPhoneScreenEnabled
                  ? 'pixel-btn-lime text-[#1a0833] ring-2 ring-[#241442]'
                  : 'pixel-btn-dark text-[#00F0FF]'
              }`}
            >
              <Zap size={16} color={!settings.passPhoneScreenEnabled ? '#1a0833' : '#00F0FF'} />
              <span className="text-[11px] leading-tight">
                {settings.language === 'fa' ? 'شروع فوری (سیب‌زمینی داغ)' : 'Fast Instant'}
              </span>
              <span className={`text-[9px] font-black ${!settings.passPhoneScreenEnabled ? 'text-[#1a0833]' : 'text-slate-200'}`}>
                {settings.language === 'fa' ? '(پیش‌فرض پرسرعت)' : '(Default)'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playToggle();
                updateSettings('passPhoneScreenEnabled', true);
              }}
              className={`pixel-btn py-2.5 px-2 text-xs font-black uppercase flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${
                settings.passPhoneScreenEnabled
                  ? 'pixel-btn-cyan text-[#1a0833] ring-2 ring-[#241442]'
                  : 'pixel-btn-dark text-[#00F0FF]'
              }`}
            >
              <Phone size={16} color={settings.passPhoneScreenEnabled ? '#1a0833' : '#00F0FF'} />
              <span className="text-[11px] leading-tight">
                {settings.language === 'fa' ? 'صفحه تحویل و مخفی‌سازی' : 'Pass Phone Guard'}
              </span>
              <span className={`text-[9px] font-black ${settings.passPhoneScreenEnabled ? 'text-[#1a0833]' : 'text-slate-200'}`}>
                {settings.language === 'fa' ? '(مخفی ماندن کلمه)' : '(Word Secrecy)'}
              </span>
            </button>
          </div>
        </section>

        {/* Sound & Music Effects - Granular Audio Controls */}
        <section className="bg-white p-3.5 sm:p-4 border-[3.5px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#39FF14] border-2 border-[#241442] flex items-center justify-center text-[#1a0833] shadow-[1px_1px_0px_0px_#241442]">
                <Volume2 size={16} />
              </div>
              <div>
                <label className="text-[#1a0833] text-xs font-black uppercase tracking-wider block">
                  {settings.language === 'fa' ? 'مدیریت صدا و موسیقی بازی' : 'Audio Controls & Music'}
                </label>
                <span className="text-[10px] text-slate-500 font-bold block">
                  {settings.language === 'fa' ? 'کنترل جداگانه افکت‌ها و موزیک زمینه' : 'Independent control for SFX & BGM'}
                </span>
              </div>
            </div>
          </div>

          {/* 1. Master Sound Toggle */}
          <div className="bg-[#FAF5FF] p-2.5 rounded-xl border-2 border-[#241442] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center border border-[#241442] ${
                settings.soundEnabled !== false ? 'bg-[#39FF14] text-[#1a0833]' : 'bg-[#FF1058] text-white'
              }`}>
                {settings.soundEnabled !== false ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </div>
              <div>
                <span className="text-xs font-black text-[#1a0833] block">
                  {settings.language === 'fa' ? 'صدای کلی (اصلی)' : 'Master Sound'}
                </span>
                <span className="text-[9px] text-slate-500 font-bold">
                  {settings.language === 'fa' ? 'قطع یا وصل تمام صداها با یک کلیک' : 'Mute or enable all sound system'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const newState = settings.soundEnabled === false;
                sound.setMuted(!newState);
                if (newState) sound.playToggle();
                updateSettings('soundEnabled', newState);
              }}
              className={`px-3 py-1.5 rounded-lg border-2 border-[#241442] font-black text-xs transition-all shadow-[2px_2px_0px_0px_#241442] active:translate-y-0.5 ${
                settings.soundEnabled !== false
                  ? 'bg-[#39FF14] text-[#1a0833]'
                  : 'bg-[#241442] text-[#FF1058]'
              }`}
            >
              {settings.soundEnabled !== false 
                ? (settings.language === 'fa' ? 'روشن 🔊' : 'ON 🔊') 
                : (settings.language === 'fa' ? 'خاموش 🔇' : 'OFF 🔇')}
            </button>
          </div>

          {/* 2. Sub-controls: SFX and BGM (Active if Master is ON) */}
          <div className="grid grid-cols-2 gap-2">
            {/* SFX Button */}
            <button
              type="button"
              disabled={settings.soundEnabled === false}
              onClick={() => {
                const newSfx = settings.sfxEnabled === false;
                sound.setSfxEnabled(newSfx);
                if (newSfx) sound.playCorrect();
                updateSettings('sfxEnabled', newSfx);
              }}
              className={`p-2.5 rounded-xl border-2 border-[#241442] flex flex-col items-start justify-between text-start transition-all shadow-[2px_2px_0px_0px_#241442] active:translate-y-0.5 ${
                settings.soundEnabled === false 
                  ? 'opacity-40 bg-slate-100 cursor-not-allowed'
                  : settings.sfxEnabled !== false
                    ? 'bg-[#E7FFF3] border-[#241442] ring-1 ring-[#39FF14]'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-1.5">
                  <Bell size={14} className={settings.sfxEnabled !== false && settings.soundEnabled !== false ? 'text-[#008751]' : 'text-slate-500'} />
                  <span className="text-xs font-black text-[#1a0833]">
                    {settings.language === 'fa' ? 'افکت‌ها (SFX)' : 'Effects (SFX)'}
                  </span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-black border border-[#241442] ${
                  settings.sfxEnabled !== false && settings.soundEnabled !== false ? 'bg-[#39FF14] text-[#1a0833]' : 'bg-slate-300 text-slate-700'
                }`}>
                  {settings.sfxEnabled !== false && settings.soundEnabled !== false ? 'ON' : 'OFF'}
                </span>
              </div>
              <span className="text-[10px] text-slate-600 font-bold leading-tight">
                {settings.language === 'fa' ? 'تیک‌تاک، حدس، زنگ' : 'Ticks, chimes, buzzers'}
              </span>
            </button>

            {/* BGM Button */}
            <button
              type="button"
              disabled={settings.soundEnabled === false}
              onClick={() => {
                const newBgm = settings.bgmEnabled === false;
                sound.setBgmEnabled(newBgm);
                if (newBgm) {
                  sound.playToggle();
                  sound.startMenuBGM();
                }
                updateSettings('bgmEnabled', newBgm);
              }}
              className={`p-2.5 rounded-xl border-2 border-[#241442] flex flex-col items-start justify-between text-start transition-all shadow-[2px_2px_0px_0px_#241442] active:translate-y-0.5 ${
                settings.soundEnabled === false 
                  ? 'opacity-40 bg-slate-100 cursor-not-allowed'
                  : settings.bgmEnabled !== false
                    ? 'bg-[#EBF7FF] border-[#241442] ring-1 ring-[#00F0FF]'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-1.5">
                  <Music size={14} className={settings.bgmEnabled !== false && settings.soundEnabled !== false ? 'text-[#0052CC]' : 'text-slate-500'} />
                  <span className="text-xs font-black text-[#1a0833]">
                    {settings.language === 'fa' ? 'موزیک (BGM)' : 'Music (BGM)'}
                  </span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-black border border-[#241442] ${
                  settings.bgmEnabled !== false && settings.soundEnabled !== false ? 'bg-[#00F0FF] text-[#1a0833]' : 'bg-slate-300 text-slate-700'
                }`}>
                  {settings.bgmEnabled !== false && settings.soundEnabled !== false ? 'ON' : 'OFF'}
                </span>
              </div>
              <span className="text-[10px] text-slate-600 font-bold leading-tight">
                {settings.language === 'fa' ? 'آهنگ زمینه و ریتم بازی' : 'Menu & dynamic beat'}
              </span>
            </button>
          </div>
        </section>

        {/* Mascot Buddy Tip */}
        <div className="p-2.5 bg-white border-2 border-[#241442] rounded-2xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#241442]">
          <TeamMascot color="BLUE" size={32} />
          <p className="text-[11px] text-[#1a0833] font-black">
            {settings.language === 'fa' ? '⚡ تنظیمات را برای یک رقابت پرشور آماده کن!' : '⚡ Ready for an epic Party Shock battle!'}
          </p>
        </div>

      </div>

      {/* Footer Navigation (Anchored) */}
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
            onNext();
          }} 
          className="pixel-btn pixel-btn-pink flex-[2] py-3.5 text-base font-black uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <span>{t.next}</span>
          {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
