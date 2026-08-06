import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Layers, Sliders, Scissors, Wand2, MonitorPlay } from 'lucide-react';
import { EDITOR_TIMELINE_SAMPLE } from '../data/portfolioData';

export const EditingStudioSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playheadPercent, setPlayheadPercent] = useState<number>(15);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [lutEnabled, setLutEnabled] = useState<boolean>(true);
  const [activeClipTitle, setActiveClipTitle] = useState<string>('A-Roll Hook Intro');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayheadPercent((prev) => {
          if (prev >= 98) return 0;
          return prev + 0.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setPlayheadPercent(0);
  };

  return (
    <section id="timeline-editor" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-400 text-xs font-mono">
            <MonitorPlay className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE EDITING STUDIO DAW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Nitish's <span className="text-cyan-400">Multi-Track Timeline Workflow</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Interact with this simulated Premiere Pro / DaVinci Resolve timeline editor. Scrub the playhead, toggle color LUTs, and view audio sound FX layers.
          </p>
        </div>

        {/* NLE Studio Outer Box */}
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden">
          
          {/* Top DAW Toolbar */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Reset Playhead"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                <span>00:00:{Math.floor(playheadPercent * 0.6).toString().padStart(2, '0')}:12</span>
              </div>
            </div>

            {/* Editing Toggles */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <button
                onClick={() => setLutEnabled(!lutEnabled)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  lutEnabled
                    ? 'bg-purple-950 border-purple-500/50 text-purple-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>DaVinci LUT: {lutEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => setAudioMuted(!audioMuted)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  !audioMuted
                    ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                {audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>Master SFX Audio</span>
              </button>
            </div>

          </div>

          {/* Monitor Preview Screen */}
          <div className="relative aspect-[21/9] w-full bg-black overflow-hidden flex items-center justify-center border-b border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
              alt="Monitor Preview"
              className={`w-full h-full object-cover transition-all duration-300 ${
                lutEnabled ? 'contrast-110 saturate-125 brightness-100' : 'contrast-75 saturate-50 brightness-90'
              }`}
            />

            {/* Playback HUD Overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              PROGRAM MONITOR &bull; 4K 120 FPS
            </div>

            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-slate-200">
              ACTIVE CLIP: <span className="text-cyan-300 font-bold">{activeClipTitle}</span>
            </div>

            {/* Audio Waveform Animating Indicator */}
            {isPlaying && !audioMuted && (
              <div className="absolute bottom-4 right-4 flex items-end gap-1 h-6 px-3 py-1 bg-black/80 rounded-lg border border-emerald-500/30">
                {[40, 90, 60, 100, 70, 30, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Timeline Tracks Section */}
          <div className="p-4 sm:p-6 bg-slate-950 space-y-3 relative overflow-x-auto">
            
            {/* Playhead Vertical Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-red-500 pointer-events-none shadow-[0_0_10px_#ef4444]"
              style={{ left: `calc(${playheadPercent}% + 140px)` }}
            >
              <div className="w-3 h-3 bg-red-500 rounded-b-sm -ml-1.25" />
            </div>

            {/* Scrubber Bar */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <div className="w-32 shrink-0 font-bold text-cyan-400">TIMELINE TRACKS</div>
              <input
                type="range"
                min="0"
                max="100"
                value={playheadPercent}
                onChange={(e) => setPlayheadPercent(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            {/* Render Track Rows */}
            {EDITOR_TIMELINE_SAMPLE.map((track) => (
              <div key={track.id} className="flex items-center gap-4 text-xs font-mono">
                <div className="w-32 shrink-0 py-1.5 px-2 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold truncate">
                  {track.name}
                </div>

                <div className="relative flex-1 h-9 rounded bg-slate-900/80 border border-slate-800/80 overflow-hidden">
                  {track.clips.map((clip) => (
                    <div
                      key={clip.id}
                      onClick={() => setActiveClipTitle(clip.title)}
                      className={`absolute top-1 bottom-1 rounded px-2 text-[11px] font-bold text-white flex items-center justify-between border cursor-pointer hover:brightness-125 transition-all truncate ${track.color}`}
                      style={{
                        left: `${clip.startPercent}%`,
                        width: `${clip.widthPercent}%`
                      }}
                    >
                      <span className="truncate">{clip.title}</span>
                      {clip.effect && (
                        <span className="ml-1 px-1 bg-black/40 text-[9px] rounded text-cyan-200 shrink-0">
                          {clip.effect}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

          {/* Workflow Bottom Info */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-cyan-400" />
              <span>Precise Sub-Frame Cut & Audio Beat Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-purple-400" />
              <span>After Effects Motion Graphics Rigging</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
