import React from 'react';
import { Film, Sliders, Move, Palette, Volume2, Type, FolderKanban, CheckCircle2 } from 'lucide-react';

export const DavinciResolveSkills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Video Editing',
      icon: <Film className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Multi-track timeline editing',
        'Cut, Trim, Ripple Edit, Roll Edit, Slip & Slide',
        'Clip splitting and timeline management',
        'Proxy workflow (basic)',
        'Keyboard shortcuts for faster editing'
      ]
    },
    {
      title: 'Transitions & Effects',
      icon: <Sliders className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Cross Dissolve',
        'Smooth Cut',
        'Dynamic Zoom',
        'Fade In / Fade Out',
        'Basic video transitions',
        'Speed Ramp (Retime Controls)',
        'Freeze Frame'
      ]
    },
    {
      title: 'Motion & Animation',
      icon: <Move className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Position, Zoom & Rotation animation',
        'Keyframe animation',
        'Transform effects',
        'Pan & Zoom',
        'Cropping',
        'Picture-in-Picture',
        'Basic masking'
      ]
    },
    {
      title: 'Color Grading',
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Color correction',
        'Primary color wheels',
        'Curves',
        'Lift, Gamma & Gain',
        'Contrast & Saturation',
        'White balance adjustment',
        'LUT application',
        'Node-based color grading',
        'Shot matching (manual)'
      ]
    },
    {
      title: 'Audio Editing',
      icon: <Volume2 className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Audio trimming',
        'Volume automation',
        'Fade In / Fade Out',
        'Noise reduction (basic)',
        'Equalizer (EQ)',
        'Compression',
        'Audio synchronization',
        'Background music mixing'
      ]
    },
    {
      title: 'Titles & Graphics',
      icon: <Type className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Basic Titles',
        'Text+',
        'Lower Thirds',
        'End Screens',
        'Animated text',
        'Credit roll'
      ]
    },
    {
      title: 'Media Management',
      icon: <FolderKanban className="w-5 h-5 text-cyan-400" />,
      skills: [
        'Import & organize media',
        'Bins & Smart Bins',
        'Timeline organization',
        'Markers',
        'Power Bins',
        'Relink media'
      ]
    }
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono font-semibold">
            <span>DAVINCI RESOLVE — TOOLS I WORK WITH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            DaVinci Resolve — <span className="text-cyan-400">Tools I Work With</span>
          </h2>
          <p className="text-slate-400 text-sm">
            A hands-on breakdown of every tool and technique I actively work with in DaVinci Resolve — from timeline editing and speed ramps to node-based color grading, Fairlight audio, and motion keyframing.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
