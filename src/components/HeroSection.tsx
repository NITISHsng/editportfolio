import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onWatchDemoReel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      
      {/* Background subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            {/* Status Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-400 text-xs font-mono font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>B.TECH 4TH YEAR CSE &bull; PROFESSIONAL VIDEO EDITOR</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>AVAILABLE FOR FREELANCE &amp; RECURRING EDITS</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Transforming <span className="text-cyan-400">Raw Footage</span> Into High-Retention Masterpieces
            </h1>
          </div>

          {/* Right: Profile Image */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-2xl scale-110 pointer-events-none" />
              <img
                src="/myimg.png"
                alt="Nitish Singha - Video Editor"
                className="relative w-64 sm:w-72 lg:w-80 xl:w-96 rounded-2xl object-cover border border-cyan-500/30 shadow-2xl shadow-cyan-900/40"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

