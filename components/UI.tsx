import React from 'react';

export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className} select-none`}>{name}</span>
);

export const Badge: React.FC<{ text: string; color?: string }> = ({ text, color = "bg-primary" }) => (
  <span className={`px-2 py-1 ${color} text-white text-[10px] uppercase tracking-wider font-bold rounded shadow-sm`}>
    {text}
  </span>
);

export const VerticalText: React.FC<{ top: string; main: string; bottom: string }> = ({ top, main, bottom }) => (
  <div className="h-full flex flex-col justify-between items-center py-4 select-none">
    <span className="text-xs font-mono text-white/40 tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>{top}</span>
    <h2 className="vertical-text font-headline text-5xl lg:text-7xl font-bold tracking-tighter text-white/10 uppercase whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
      {main}
    </h2>
    <span className="text-xs font-mono text-white/40 tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>{bottom}</span>
  </div>
);

export const NavButton: React.FC<{ icon: string; onClick: () => void; disabled?: boolean; className?: string }> = ({ icon, onClick, disabled, className }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 lg:w-12 lg:h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all group shadow-2xl hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
  >
    <Icon name={icon} className="text-slate-400 group-hover:text-white transition-colors text-2xl" />
  </button>
);
