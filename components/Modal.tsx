import React from 'react';

interface Action {
  label: string;
  onClick: () => void;
  primary?: boolean;
  danger?: boolean;
}

interface Props {
  title: string;
  body: string;
  actions: Action[];
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, body, actions, children }) => {
  return (
    <div className="fixed inset-0 bg-[#160f2e]/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 select-none">
      {/* 3D Pixel Double Border Card */}
      <div className="pixel-card bg-white w-full max-w-sm overflow-hidden animate-wiggle rounded-3xl border-[3.5px] border-[#241c48] shadow-[6px_6px_0px_0px_#241c48]" style={{ animationDuration: '4s' }}>
        
        {/* Colorful Festive Garland Header */}
        <div className="h-4 bg-repeat-x bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 border-b-2 border-[#241c48] relative">
        </div>

        {/* Modal Info */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-black text-indigo-950 mb-2 border-b-2 border-indigo-100 pb-2 tracking-tight">
            🚨 {title} 🚨
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm font-black bg-indigo-50/80 p-3 border-2 border-indigo-100 rounded-2xl">
            {body}
          </p>
          {children && (
            <div className="mt-3 text-start">
              {children}
            </div>
          )}
        </div>

        {/* Modal Controls with high-contrast pixel buttons */}
        <div className="p-4 bg-indigo-50/50 border-t-2 border-indigo-100 flex flex-col gap-2.5">
          {actions.map((action, i) => {
            let btnClass = 'pixel-btn-purple';
            if (action.primary) btnClass = 'pixel-btn-pink';
            if (action.danger) btnClass = 'pixel-btn-dark';

            return (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                className={`pixel-btn ${btnClass} w-full py-3.5 font-black text-sm uppercase tracking-wider`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
