import React, { useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { TeamMascot } from '../components/Mascots';
import { sound } from '../soundManager';
import { BookOpen, HelpCircle, Sparkles, Zap, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  language: Language;
  onClose: () => void;
  initialSection?: string;
}

const HelpScreen: React.FC<Props> = ({ language, onClose, initialSection }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];
  const help = t.helpContent;
  const isRTL = language === 'fa' || language === 'ar';

  useEffect(() => {
    if (initialSection && scrollRef.current) {
      const element = document.getElementById(`help-${initialSection}`);
      if (element && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialSection]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col bg-pixel-grid overflow-hidden select-none" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Panel */}
      <div className="p-3.5 bg-gradient-to-r from-[#7B2CBF] via-[#FF007F] to-[#FF2E93] border-b-4 border-[#241442] flex items-center justify-between z-10 text-white shadow-[0px_3px_0px_0px_#241442] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border-2 border-[#241442] flex items-center justify-center text-[#1a0833] shadow-[1px_1px_0px_0px_#241442]">
            <BookOpen size={18} color="#1a0833" />
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">{help.title || t.guide}</h2>
        </div>
        <button 
          onClick={handleClose} 
          className="w-9 h-9 flex items-center justify-center bg-[#FFE600] hover:bg-yellow-300 text-[#1a0833] border-2 border-[#241442] font-black rounded-xl active:translate-y-0.5 shadow-[2px_2px_0px_0px_#241442]"
        >
          ✕
        </button>
      </div>

      {/* Rules content */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-3.5 space-y-3 overscroll-contain">
        
        {/* Intro Tip bubble */}
        <div className="bg-white p-3.5 border-[3px] border-[#241442] rounded-2xl shadow-[3px_3px_0px_0px_#241442] flex items-center gap-3">
          <TeamMascot color="PARTY" size={40} />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] bg-[#FFE600] text-[#1a0833] border border-[#241442] px-2 py-0.5 rounded-lg font-black uppercase shadow-xs flex items-center gap-1 w-fit">
              <Zap size={11} color="#1a0833" fill="#1a0833" />
              <span>{language === 'fa' ? 'نکته طلایی بازی' : 'PARTY TIP'}</span>
            </span>
            <p className="text-[11px] font-black text-[#1a0833] leading-normal mt-1">
              {language === 'fa' ? 'کلمه را به یارتان برسانید و بدون اتلاف وقت گوشی را به نفر بعد بدهید!' : 'Pass the phone after every correct word. Avoid using forbidden gestures!'}
            </p>
          </div>
        </div>

        {/* Dynamic Sections */}
        {help.sections.map((section: any) => (
          <section 
            key={section.id} 
            id={`help-${section.id}`}
            className="bg-white p-3.5 rounded-2xl border-[3px] border-[#241442] shadow-[4px_4px_0px_0px_#241442] relative overflow-hidden"
          >
            {/* Tag Badge */}
            <div className="bg-[#00F0FF] border-2 border-[#241442] inline-flex items-center gap-1.5 font-black text-[#1a0833] px-3 py-1 text-xs rounded-xl uppercase shadow-[2px_2px_0px_0px_#241442] mb-2">
              <Sparkles size={14} color="#1a0833" />
              <span>{section.title}</span>
            </div>
            
            {/* Styled body */}
            <p className="text-xs font-bold text-[#1a0833] leading-relaxed whitespace-pre-line tracking-wide bg-[#F8EFFF] p-3 border border-[#241442]/20 rounded-xl">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      {/* Footer Return Drawer */}
      <div className="p-3 bg-white border-t-4 border-[#241442] z-10 flex gap-4 shrink-0">
        <button 
          onClick={handleClose} 
          className="pixel-btn pixel-btn-pink w-full py-3.5 text-base font-black uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <span>{t.resume}</span>
          <Zap size={18} color="#FFE600" fill="#FFE600" />
        </button>
      </div>
    </div>
  );
};

export default HelpScreen;
