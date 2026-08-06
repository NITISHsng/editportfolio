import React from 'react';
import { X, Download, FileText, GraduationCap, Award, Briefcase, Code, Sparkles } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onOpenContact
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden text-left p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Curriculum Vitae / Resume</h3>
              <p className="text-xs text-slate-400">{EDITOR_INFO.name} &bull; {EDITOR_INFO.degree}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resume Content Body */}
        <div className="space-y-6 text-xs text-slate-300 max-h-[65vh] overflow-y-auto pr-2">
          
          {/* Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-cyan-300 font-mono text-sm uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Professional Overview</span>
            </h4>
            <p className="leading-relaxed">
              4th-Year Computer Science & Engineering student with 3+ years of freelance experience as a lead video editor, motion designer, and colorist. Specialized in YouTube channel retention editing, 3D Blender camera tracking, After Effects expression programming, and sound design. Generated over 10M+ views across client campaigns.
            </p>
          </div>

          {/* Education & Degree */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-mono text-sm uppercase flex items-center gap-2 border-b border-slate-800 pb-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Education</span>
            </h4>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-start">
              <div>
                <p className="font-bold text-sm text-white">Bachelor of Technology (B.Tech) - Computer Science & Engineering</p>
                <p className="text-slate-400 text-xs mt-0.5">4th Year Student (Expected Graduation 2026)</p>
                <p className="text-xs text-slate-400 mt-2">Relevant Coursework: Data Structures, Computer Graphics, Digital Signal Processing, Python, Web Engineering</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800 font-mono font-semibold text-[10px]">
                2022 - 2026
              </span>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-mono text-sm uppercase flex items-center gap-2 border-b border-slate-800 pb-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Video Editing & Motion Design Experience</span>
            </h4>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm text-cyan-400">Lead Senior Video Editor</p>
                    <p className="text-slate-400 text-xs">TechXplore Studio & YouTube Creators (Freelance)</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px]">2023 - PRESENT</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed pl-1">
                  <li>Edited 80+ long-form tech reviews and Esports montages resulting in +85% retention increase.</li>
                  <li>Wrote custom JS expressions in After Effects to automate kinetic callout graphics and spec overlays.</li>
                  <li>Performed DaVinci Resolve color grading (S-LOG3 to Rec.709) and multi-track Fairlight sound design.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm text-cyan-400">Short-Form Content Specialist</p>
                    <p className="text-slate-400 text-xs">Reels & TikTok Agency Partners</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px]">2024 - PRESENT</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed pl-1">
                  <li>Produced 100+ vertical shorts generating over 4.8M viral views.</li>
                  <li>Applied 2-second retention hook formulas with animated captions and sound effects every 1.5 seconds.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Technical Stack */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-mono text-sm uppercase flex items-center gap-2 border-b border-slate-800 pb-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Software & Programming Stack</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">Adobe Premiere Pro 2026</div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">After Effects (Expression Rigs)</div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">DaVinci Resolve Studio</div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">Blender 3D Modeling</div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">Python Video Scripting</div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">iZotope RX Sound Repair</div>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-400">
            Email: <span className="text-cyan-400 font-bold">{EDITOR_INFO.contacts.email}</span>
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                alert("Resume downloaded as text snapshot! Contact Nitish directly for official PDF copy.");
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20"
            >
              Contact Nitish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
