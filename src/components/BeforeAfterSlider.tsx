import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, Check, MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // Percentage 0 to 100
  const [activePreset, setActivePreset] = useState<number>(0);
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const presets = [
    {
      id: 'p1',
      title: 'Cinematic Teal & Orange',
      rawLabel: 'Flat Sony S-LOG3 Raw Footage',
      editedLabel: 'Nitish Mastered DaVinci Color Grade',
      rawImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      editedImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      specs: ['LUT: Hollywood Gold 3D', 'Space: Rec.709 Gamma 2.4', 'Skin Tones Restored: 100%']
    },
    {
      id: 'p2',
      title: 'Cyberpunk Neon Esports',
      rawLabel: 'Uncompressed 60FPS Game Stream VOD',
      editedLabel: 'Glow VFX + Velocity Curve + Deep Contrast',
      rawImg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
      editedImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      specs: ['VFX: Boris Sapphire Glow', 'Motion Blur: Resampled 120fps', 'Impact Sound Sync']
    },
    {
      id: 'p3',
      title: 'Warm Wilderness Documentary',
      rawLabel: 'Unprocessed Drone Flat Profile',
      editedLabel: 'Film Grain 35mm + Shadow Recovery',
      rawImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      editedImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      specs: ['Grain: Kodak 5207 Emulation', 'Highlights Rolloff: Soft Film Curve', 'Sky Masked']
    }
  ];

  const currentPreset = presets[activePreset];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="before-after" className="py-16 lg:py-24 bg-slate-950/60 relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE COLOR GRADING DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Raw Footage vs <span className="text-cyan-400">Nitish's Color Grading</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Drag the slider horizontally to compare flat unedited raw camera profiles against Nitish’s final color-graded master output.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {presets.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePreset(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activePreset === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {activePreset === idx && <Check className="w-3.5 h-3.5" />}
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Container */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black">
          
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/9] w-full select-none cursor-ew-resize overflow-hidden"
          >
            {/* Edited Image (Full Background) */}
            <img
              src={currentPreset.editedImg}
              alt="Mastered Footage"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Edited Label Badge */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-cyan-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-xl">
              ✨ NITISH'S GRADED MASTER
            </div>

            {/* Raw Image (Clipped Left Layer) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={currentPreset.rawImg}
                alt="Raw Unedited Footage"
                className="absolute inset-0 w-full h-full object-cover filter contrast-75 saturate-50 brightness-90 max-w-none"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              />
              
              {/* Raw Label Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-mono font-bold shadow-xl whitespace-nowrap">
                📷 RAW UNEDITED FOOTAGE
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-cyan-400 cursor-ew-resize shadow-[0_0_15px_#00f2fe]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Technical Specs Footer */}
          <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sliders className="w-4 h-4" />
              <span className="font-bold">{currentPreset.title} Pipeline</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {currentPreset.specs.map((spec, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                  {spec}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
