import React from 'react';
import { Film, Code2, ShieldCheck } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenEstimator: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0b0c10]/85 border-b border-cyan-500/15 shadow-lg shadow-black/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <Film className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              <Code2 className="w-3 h-3 text-purple-400 absolute bottom-1 right-1" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-300 transition-colors">
                {EDITOR_INFO.name}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 tracking-wide">
              B.Tech 4th Year CSE &bull; Motion & Video Editor
            </p>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono shadow-md shadow-cyan-950 transition-all hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Panel</span>
          </button>
        </div>

      </div>
    </header>
  );
};


