import React from 'react';
import { EDITOR_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenEstimator?: () => void;
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0b0c10]/85 border-b border-cyan-500/15 shadow-lg shadow-black/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group"
        >
          <img
            src="/logo.png"
            alt={EDITOR_INFO.name}
            className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
          />
        </div>

      </div>
    </header>
  );
};


