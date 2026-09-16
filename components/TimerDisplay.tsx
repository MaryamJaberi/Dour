import React from 'react';
import { NeonClock } from './NeonIcons';

interface Props {
  ms: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  colorClass?: string;
}

const TimerDisplay: React.FC<Props> = ({ ms, label, size = 'md', active = false }) => {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);

  // Pick vibrant pixel colors based on warnings
  const isPanic = seconds <= 15;
  const digitColor = isPanic ? 'text-[#FF1058] drop-shadow-[0_0_8px_#FF1058]' : (active ? 'text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]' : 'text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]');

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl'
  };

  return (
    <div className={`flex flex-col items-center transition-all ${active ? 'scale-105' : 'opacity-90'}`}>
      {/* Label */}
      {label && (
        <span className="text-[9.5px] uppercase tracking-wider text-[#160430] bg-[#FFE600] border border-[#160430] px-2 py-0.5 rounded font-black mb-1 shadow-[1px_1px_0px_0px_#160430]">
          {label}
        </span>
      )}

      {/* Clock Plate Capsule wrapper */}
      <div className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-[#160430] border-2 border-[#160430] rounded-xl shadow-[3px_3px_0px_0px_#160430] flex items-center justify-center gap-2`}>
        <NeonClock size={18} color={isPanic ? '#FF1058' : '#FFE600'} />

        <div className={`font-pixel ${sizeClasses[size]} ${digitColor} tabular-nums flex items-baseline`} dir="ltr">
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="mx-0.5 animate-pulse opacity-85">:</span>
          <span>{remainingSeconds.toString().padStart(2, '0')}</span>
          {size !== 'sm' && (
            <>
              <span className="mx-0.5 text-xs opacity-65">.</span>
              <span className="text-[11px] opacity-80 w-5">{centiseconds.toString().padStart(2, '0')}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
