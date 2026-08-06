import React, { useState } from 'react';
import { Calculator, X, Sparkles, Clock, CheckCircle2, Send, DollarSign, Wand2 } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface ProjectEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInquiry: (message: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  isOpen,
  onClose,
  onSendInquiry
}) => {
  if (!isOpen) return null;

  const [videoType, setVideoType] = useState<'youtube' | 'short' | 'commercial' | 'gaming' | 'motion'>('youtube');
  const [rawDurationMinutes, setRawDurationMinutes] = useState<number>(30);
  const [hasColorGrading, setHasColorGrading] = useState<boolean>(true);
  const [hasSoundDesign, setHasSoundDesign] = useState<boolean>(true);
  const [hasMotionGraphics, setHasMotionGraphics] = useState<boolean>(true);
  const [hasSubtitles, setHasSubtitles] = useState<boolean>(true);
  const [hasUrgency, setHasUrgency] = useState<boolean>(false);

  // Price Calculation Logic
  const calculatePrice = () => {
    let basePrice = 80; // USD base
    if (videoType === 'short') basePrice = 45;
    if (videoType === 'gaming') basePrice = 90;
    if (videoType === 'motion') basePrice = 120;
    if (videoType === 'commercial') basePrice = 180;

    // Footage duration multiplier
    const durationMultiplier = Math.max(1, rawDurationMinutes / 20);
    let total = basePrice * durationMultiplier;

    if (hasColorGrading) total += 35;
    if (hasSoundDesign) total += 35;
    if (hasMotionGraphics) total += 50;
    if (hasSubtitles) total += 25;
    if (hasUrgency) total *= 1.35;

    return Math.round(total);
  };

  const calculateDays = () => {
    let days = 2;
    if (rawDurationMinutes > 45) days += 1;
    if (hasMotionGraphics) days += 1;
    if (hasUrgency) days = 1;
    return days;
  };

  const estimatedPriceUSD = calculatePrice();
  const estimatedDays = calculateDays();

  const generatedInquiryText = `Hi Nitish, I used your Portfolio Cost Estimator for a ${videoType.toUpperCase()} project.\n- Raw Footage: ~${rawDurationMinutes} mins\n- Add-ons: ${hasColorGrading ? 'Color Grading, ' : ''}${hasSoundDesign ? 'Sound Design, ' : ''}${hasMotionGraphics ? '3D Motion Graphics, ' : ''}${hasSubtitles ? 'Captions' : ''}\n- Estimated Quote: $${estimatedPriceUSD} (~${estimatedDays} days turnaround).\nLet's discuss starting this project!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-left p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Instant Project Cost Estimator</h3>
              <p className="text-xs text-slate-400">Configure your video specs to get an instant turnaround & price quote</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Inputs */}
        <div className="space-y-5">
          
          {/* Video Type */}
          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-2">1. SELECT VIDEO CATEGORY</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
              {[
                { id: 'youtube', label: '🚀 YouTube Longform' },
                { id: 'short', label: '⚡ Viral Short / Reel' },
                { id: 'gaming', label: '🎮 Gaming / Esports' },
                { id: 'motion', label: '🎨 Motion Graphics' },
                { id: 'commercial', label: '💎 Commercial Ad' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVideoType(item.id as any)}
                  className={`p-3 rounded-xl border transition-all text-left ${
                    videoType === item.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Raw Footage Length Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <span className="text-cyan-400">2. RAW FOOTAGE DURATION</span>
              <span className="text-white font-bold">{rawDurationMinutes} Minutes</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={rawDurationMinutes}
              onChange={(e) => setRawDurationMinutes(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Special Add-ons */}
          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-2">3. EDITING & VFX ADD-ONS</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { state: hasColorGrading, set: setHasColorGrading, label: 'DaVinci Resolve Color Grading' },
                { state: hasSoundDesign, set: setHasSoundDesign, label: 'Layered SFX & Voice Denoise' },
                { state: hasMotionGraphics, set: setHasMotionGraphics, label: '3D Callouts & Motion Intro' },
                { state: hasSubtitles, set: setHasSubtitles, label: 'Animated Dynamic Captions' },
                { state: hasUrgency, set: setHasUrgency, label: '⚡ Fast 24-48h Rush Delivery' }
              ].map((addon, idx) => (
                <label
                  key={idx}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                    addon.state
                      ? 'bg-slate-950 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addon.state}
                    onChange={(e) => addon.set(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>{addon.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Calculated Quote Output Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">ESTIMATED PRICE QUOTE</span>
            <div className="text-3xl font-extrabold text-white flex items-baseline gap-1">
              <span>${estimatedPriceUSD}</span>
              <span className="text-xs font-normal text-slate-400">USD (~₹{(estimatedPriceUSD * 86).toLocaleString()})</span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Turnaround: {estimatedDays} Business Days</span>
            </p>
          </div>

          <button
            onClick={() => {
              onSendInquiry(generatedInquiryText);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send Quote to Nitish</span>
          </button>
        </div>

      </div>
    </div>
  );
};
