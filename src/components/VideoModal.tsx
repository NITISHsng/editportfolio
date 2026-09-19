import React from 'react';
import { X, Film, ExternalLink, Youtube, Instagram, Facebook } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoModalProps {
  project: VideoProject | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  const platform = project.platform || 'youtube';

  const getEmbedSource = () => {
    if (platform === 'instagram') {
      if (project.videoUrl) {
        const cleanUrl = project.videoUrl.split('?')[0].replace(/\/$/, '');
        return `${cleanUrl}/embed`;
      }
      return `https://www.instagram.com/p/${project.youtubeId}/embed`;
    }
    if (platform === 'facebook') {
      if (project.videoUrl) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(project.videoUrl)}&show_text=false&autoplay=true`;
      }
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent('https://www.facebook.com/watch/?v=' + project.youtubeId)}&show_text=false&autoplay=true`;
    }
    // Default YouTube
    return `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const getDirectUrl = () => {
    if (platform === 'instagram') {
      return project.videoUrl || 'https://www.instagram.com/';
    }
    if (platform === 'facebook') {
      return project.videoUrl || 'https://www.facebook.com/';
    }
    return `https://www.youtube.com/watch?v=${project.youtubeId}`;
  };

  const getPlatformBadge = () => {
    if (platform === 'instagram') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-600/20 text-rose-400 border border-rose-500/30 text-xs font-mono">
          <Instagram className="w-3.5 h-3.5" />
          <span>Instagram Reel</span>
        </span>
      );
    }
    if (platform === 'facebook') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-400 border border-blue-500/30 text-xs font-mono">
          <Facebook className="w-3.5 h-3.5" />
          <span>Facebook Video</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-950/80 text-red-400 border border-red-500/30 text-xs font-mono">
        <Youtube className="w-3.5 h-3.5" />
        <span>YouTube Video</span>
      </span>
    );
  };

  const isVertical = platform === 'instagram' || project.category === 'shorts';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Container Card */}
      <div className={`relative w-full ${isVertical ? 'max-w-xl' : 'max-w-4xl'} bg-slate-900 rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden my-auto text-left transition-all`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="mb-0.5">{getPlatformBadge()}</div>
              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Embedded Video Player Container */}
          <div className={`relative ${isVertical ? 'aspect-[3/4] max-h-[520px] mx-auto' : 'aspect-video'} w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl`}>
            <iframe
              src={getEmbedSource()}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 pt-1">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              Project Description
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <a
            href={getDirectUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>Open on {platform === 'instagram' ? 'Instagram' : platform === 'facebook' ? 'Facebook' : 'YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

