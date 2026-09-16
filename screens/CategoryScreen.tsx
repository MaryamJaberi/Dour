import React from 'react';
import { GameSettings } from '../types';
import { CATEGORIES } from '../constants';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { NeonCategoryIcon } from '../components/NeonIcons';
import { sound } from '../soundManager';
import { Layers, HelpCircle, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface Props {
  settings: GameSettings;
  onSave: (s: GameSettings) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenHelp: () => void;
}

const CategoryScreen: React.FC<Props> = ({ settings, onSave, onNext, onBack, onOpenHelp }) => {
  const t = TRANSLATIONS[settings.language];
  const isRTL = settings.language === 'fa' || settings.language === 'ar';
  
  const toggleCategory = (catKey: string) => {
    sound.playToggle();
    let selected = [...settings.selectedCategories];
    if (selected.includes(catKey)) {
      if (selected.length > 1) {
        selected = selected.filter(s => s !== catKey);
      }
    } else {
      selected.push(catKey);
    }
    onSave({ ...settings, selectedCategories: selected });
  };

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col p-3.5 sm:p-4 select-none overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Party & Co SHOCK YOU! gradient */}
      <div className="flex items-center justify-between mb-2.5 bg-gradient-to-r from-[#7B2CBF] via-[#FF007F] to-[#FF2E93] text-white p-3 border-[3.5px] border-[#241442] rounded-2xl shadow-[4px_4px_0px_0px_#241442] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833] shadow-[1px_1px_0px_0px_#241442]">
            <Layers size={18} color="#1a0833" />
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">
            {t.categories_title || t.categories.CAT_TITLE || 'Categories'}
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

      {/* High-Contrast Hint Pill */}
      <p className="text-[#1a0833] text-[11px] font-black mb-2.5 bg-white p-2 border-2 border-[#241442] rounded-xl shadow-[2px_2px_0px_0px_#241442] text-center flex items-center justify-center gap-1.5 shrink-0">
        <Sparkles size={14} color="#FF007F" />
        <span>{t.categoryHint}</span>
      </p>

      {/* Categories Scrollable Container */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1 space-y-2.5 pb-2 overscroll-contain">
        {Object.keys(CATEGORIES).map(catKey => {
          const isSelected = settings.selectedCategories.includes(catKey);
          const translatedName = t.categories[catKey] || catKey;
          
          return (
            <button
              key={catKey}
              type="button"
              onClick={() => toggleCategory(catKey)}
              className={`w-full p-3 rounded-2xl border-[3.5px] border-[#241442] flex items-center justify-between transition-all ${
                isSelected
                ? 'bg-gradient-to-r from-[#FFF033] to-[#FFE600] text-[#1a0833] shadow-[4px_4px_0px_0px_#241442] -translate-x-0.5 -translate-y-0.5'
                : 'bg-white text-[#1a0833] shadow-[2px_2px_0px_0px_#241442] hover:bg-[#F9F0FF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border-2 border-[#241442] ${isSelected ? 'bg-[#241442]' : 'bg-[#241442]'}`}>
                  <NeonCategoryIcon catKey={catKey} size={20} />
                </div>
                <span className="font-black text-sm uppercase text-[#1a0833]">{translatedName}</span>
              </div>

              {/* High Contrast Checkbox */}
              <div className={`w-7 h-7 border-2 border-[#241442] flex items-center justify-center rounded-xl shadow-[1px_1px_0px_0px_#241442] ${
                isSelected ? 'bg-[#241442]' : 'bg-white'
              }`}>
                {isSelected && (
                  <Check size={18} color="#39FF14" strokeWidth={3.5} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Decorative Mascot Green Buddy */}
      <div className="my-1.5 p-2 bg-white border-2 border-[#241442] rounded-2xl flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#241442] shrink-0">
        <TeamMascot color="GREEN" size={30} />
        <span className="text-[11px] text-[#1a0833] font-black">
          {settings.language === 'fa' ? '⚡ هرچی دسته‌ها متنوع‌تر، بازی مهیج‌تر!' : '⚡ Pick multiple categories for maximum thrills!'}
        </span>
      </div>

      {/* Footer Navigation */}
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
            sound.playClick();
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

export default CategoryScreen;
