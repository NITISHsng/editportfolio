import React from 'react';
import { Code2, Terminal, Cpu, Sparkles, Zap, FileCode, CheckCircle, ArrowRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const TechSynergySection: React.FC = () => {
  return (
    <section id="cs-synergy" className="py-16 lg:py-24 bg-slate-950/70 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE COMPUTER SCIENCE ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            B.Tech CSE <span className="text-cyan-400">+ Video Editing Synergy</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Nitish isn’t just a video editor — as a 4th Year Computer Science & Engineering student, he builds custom code scripts, expressions, and automated pipelines to edit faster and build complex motion graphics.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: AE Expressions & JS */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              After Effects JavaScript Expressions
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Writing mathematical expression scripts for inertia physics, elasticity bounce, dynamic text sizing, and automated kinetic callouts directly in AE.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-400 border border-slate-800">
              <code>{`amp = .05; freq = 4.0; decay = 8.0;\nn = 0; if (numKeys > 0){...}`}</code>
            </div>
          </div>

          {/* Card 2: Python & FFmpeg Automation */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Python & FFmpeg Video Automation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automating bulk clip extraction, proxy file rendering, thumbnail batch processing, and silence detection to speed up post-production by 300%.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-400 border border-slate-800">
              <code>{`ffmpeg -i raw.mp4 -vf "scale=1080:1920" -c:v libx264 short.mp4`}</code>
            </div>
          </div>

          {/* Card 3: AI & Algorithmic Retention */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Algorithmic Audience Retention Modeling
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyzing YouTube retention analytics curves to insert visual pattern breakers, sound FX impacts, and B-roll exactly where viewer drop-offs occur.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-400 border border-slate-800">
              <code>{`Target: 70%+ Average View Duration (AVD)`}</code>
            </div>
          </div>

        </div>

        {/* Technical Proficiency Skill Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono border-b border-slate-800 pb-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{cat.title}</span>
              </h3>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
