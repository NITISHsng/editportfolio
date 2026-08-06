import React from 'react';
import { Film, Code2, Heart, Youtube, Linkedin, Github, Instagram, Mail, ArrowUp } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenEstimator: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEstimator,
  onOpenResume,
  onOpenContact
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-slate-900 text-slate-400 py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Socials */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a href={EDITOR_INFO.contacts.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-800 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={EDITOR_INFO.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={EDITOR_INFO.contacts.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={EDITOR_INFO.contacts.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-pink-400 border border-slate-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-left text-xs font-mono">
            <p className="font-bold text-white uppercase tracking-wider">PORTFOLIO SECTIONS</p>
            <ul className="space-y-2">
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">Featured Video Works</a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-cyan-400 transition-colors">Color Grading & LUTs</a>
              </li>
              <li>
                <a href="#timeline-editor" className="hover:text-cyan-400 transition-colors">Timeline DAW Simulator</a>
              </li>
              <li>
                <a href="#cs-synergy" className="hover:text-cyan-400 transition-colors">B.Tech CSE Automation</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Utilities */}
          <div className="md:col-span-4 space-y-3 text-left text-xs font-mono">
            <p className="font-bold text-white uppercase tracking-wider">INTERACTIVE TOOLS</p>
            <div className="space-y-2">
              <button
                onClick={onOpenEstimator}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-slate-800 flex items-center justify-between"
              >
                <span>Project Cost Estimator</span>
                <span className="text-[10px] text-slate-500">Calculator</span>
              </button>

              <button
                onClick={onOpenResume}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-between"
              >
                <span>Download Resume</span>
                <span className="text-[10px] text-slate-500">PDF</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} {EDITOR_INFO.name}. Built with React, Three.js 3D, and Tailwind.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors flex items-center gap-1.5 font-mono"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
