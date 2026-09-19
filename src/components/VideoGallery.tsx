import React, { useState, useEffect, useRef } from 'react';
import { Play, Search, Eye, Filter, ArrowUpRight, CheckCircle2, Film, VolumeX, LayoutList, LayoutGrid, ArrowLeft, ArrowRight, Youtube, Instagram, Facebook } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoGalleryProps {
  projects: VideoProject[];
  onSelectProject: (project: VideoProject) => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  projects,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'alternating' | 'grid'>('alternating');
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});

  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories = [
    { id: 'all', label: 'All Edits' },
    { id: 'vlogs', label: 'Tech & Vlogs' },
    { id: 'gaming', label: 'Gaming & Esports' },
    { id: 'shorts', label: 'Shorts & Reels' },
    { id: 'motion', label: 'Motion Graphics' },
    { id: 'cinematic', label: 'Cinematic Films' },
    { id: 'commercial', label: 'Commercial Ads' }
  ];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = activeCategory === 'all' || proj.category === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.softwareUsed.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Intersection Observer for Scroll Directional Entrance & In-Frame Auto Play
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-project-id');
          if (id) {
            setVisibleItems((prev) => ({ ...prev, [id]: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el as Element);
    });

    return () => observer.disconnect();
  }, [filteredProjects, layoutMode]);

  return (
    <section id="gallery" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>FEATURED SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Selected <span className="text-cyan-400">Video Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Scroll down to watch project cards alternate <span className="text-cyan-400 font-medium">Left-to-Right & Right-to-Left</span>. Hover for silent auto-preview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Layout Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setLayoutMode('alternating')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  layoutMode === 'alternating'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Alternating Left-to-Right Scroll Layout"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Alternating</span>
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="3-Column Grid Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search edits, tools, client..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 text-slate-200 text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none placeholder-slate-500 transition-colors"
            />
          </div>

        </div>

        {/* Video Cards List / Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold text-lg">No video projects matched your search.</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or search keywords.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-cyan-400 text-xs font-mono border border-cyan-500/30"
            >
              Reset Filters
            </button>
          </div>
        ) : layoutMode === 'alternating' ? (
          /* ALTERNATING SHOWCASE ROWS (Left to Right / Right to Left) */
          <div className="space-y-12">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 1; // Even index = Right to Left
              const isHovered = hoveredProjectId === project.id;
              const isVisible = visibleItems[project.id] ?? false;

              return (
                <div
                  key={project.id}
                  data-project-id={project.id}
                  ref={(el) => { itemRefs.current[project.id] = el; }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => onSelectProject(project)}
                  style={{
                    transform: isVisible
                      ? 'translateX(0px)'
                      : isEven
                      ? 'translateX(60px)'
                      : 'translateX(-60px)',
                    opacity: isVisible ? 1 : 0
                  }}
                  className={`group relative bg-slate-900/90 rounded-3xl border border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-700 ease-out overflow-hidden cursor-pointer flex flex-col ${
                    isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } gap-0 items-stretch min-h-0 lg:min-h-[320px]`}
                >
                  {/* Thumbnail / Preview Box (50% Width on Large Screen) */}
                  <div className={`relative ${project.category === 'shorts' || project.platform === 'instagram' ? 'aspect-[3/4] sm:aspect-[3/4] lg:aspect-[3/4] lg:w-[40%]' : 'aspect-video lg:aspect-auto lg:w-1/2'} shrink-0 bg-slate-950 overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-full`}>
                    
                    {/* Auto-play iframe when in frame or on hover */}
                    {(isVisible || isHovered) && project.youtubeId ? (
                      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&modestbranding=1`}
                          title={project.title}
                          className="w-full h-full scale-125 object-cover"
                          allow="autoplay; encrypted-media"
                        />
                        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/80 text-[10px] text-cyan-400 font-mono flex items-center gap-1.5 border border-cyan-500/30">
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>AUTO-PLAYING</span>
                        </div>
                      </div>
                    ) : project.youtubeId ? (
                      <img
                        src={`https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <Film className="w-12 h-12 text-slate-700" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Play Button Overlay when paused */}
                    {!(isVisible || isHovered) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-slate-950/80 border border-cyan-500/50 text-cyan-400 flex items-center justify-center shadow-2xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Direction Flow & Platform Badge */}
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
    

                      {project.platform === 'instagram' && (
                        <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-[11px] font-mono text-rose-400 border border-rose-500/30 flex items-center gap-1">
                          <Instagram className="w-3.5 h-3.5" />
                          <span>Instagram</span>
                        </div>
                      )}
                      {project.platform === 'facebook' && (
                        <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-[11px] font-mono text-blue-400 border border-blue-500/30 flex items-center gap-1">
                          <Facebook className="w-3.5 h-3.5" />
                          <span>Facebook</span>
                        </div>
                      )}
                      {(!project.platform || project.platform === 'youtube') && (
                        <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-[11px] font-mono text-red-400 border border-red-500/30 flex items-center gap-1">
                          <Youtube className="w-3.5 h-3.5" />
                          <span>YouTube</span>
                        </div>
                      )}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-md bg-slate-950/90 text-xs font-mono text-slate-300 border border-slate-800">
                      {project.duration}
                    </div>

                  </div>

                  {/* Card Info & Details Box (50% Width on Large Screen) */}
                  <div className={`p-6 sm:p-8 flex flex-col justify-between space-y-4 lg:space-y-6 ${project.category === 'shorts' || project.platform === 'instagram' ? 'lg:w-[60%]' : 'lg:w-1/2'}`}>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4 lg:line-clamp-5">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-start">
                      <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800 group-hover:border-cyan-500/50 group-hover:bg-cyan-500 group-hover:text-slate-950 font-bold text-xs transition-all">
                        <span>Watch Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* STANDARD 3-COL GRID WITH SCROLL DIRECTIONAL ANIMATIONS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 1;
              const isHovered = hoveredProjectId === project.id;
              const isVisible = visibleItems[project.id] ?? false;

              return (
                <div
                  key={project.id}
                  data-project-id={project.id}
                  ref={(el) => { itemRefs.current[project.id] = el; }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => onSelectProject(project)}
                  style={{
                    transform: isVisible
                      ? 'translateX(0px)'
                      : isEven
                      ? 'translateX(40px)'
                      : 'translateX(-40px)',
                    opacity: isVisible ? 1 : 0
                  }}
                  className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/60 shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full hover:-translate-y-2"
                >
                  {/* Thumbnail & Auto Hover-Video Preview */}
                  <div className={`relative ${project.category === 'shorts' || project.platform === 'instagram' ? 'aspect-[3/4]' : 'aspect-video'} w-full shrink-0 overflow-hidden bg-slate-950`}>
                    
                    {(isVisible || isHovered) && project.youtubeId ? (
                      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&modestbranding=1`}
                          title={project.title}
                          className="w-full h-full scale-125 object-cover"
                          allow="autoplay; encrypted-media"
                        />
                        <div className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded bg-black/80 text-[10px] text-cyan-400 font-mono flex items-center gap-1 border border-cyan-500/30">
                          <VolumeX className="w-3 h-3" />
                          <span>AUTO-PLAYING</span>
                        </div>
                      </div>
                    ) : project.youtubeId ? (
                      <img
                        src={`https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <Film className="w-10 h-10 text-slate-700" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Platform Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      {project.platform === 'instagram' && (
                        <div className="px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-mono text-rose-400 border border-rose-500/30 flex items-center gap-1">
                          <Instagram className="w-3 h-3" />
                          <span>Instagram</span>
                        </div>
                      )}
                      {project.platform === 'facebook' && (
                        <div className="px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-mono text-blue-400 border border-blue-500/30 flex items-center gap-1">
                          <Facebook className="w-3 h-3" />
                          <span>Facebook</span>
                        </div>
                      )}
                      {(!project.platform || project.platform === 'youtube') && (
                        <div className="px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-mono text-red-400 border border-red-500/30 flex items-center gap-1">
                          <Youtube className="w-3 h-3" />
                          <span>YouTube</span>
                        </div>
                      )}
                    </div>

                    {!(isVisible || isHovered) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-slate-950/80 border border-cyan-500/50 text-cyan-400 flex items-center justify-center shadow-lg group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed min-h-[3.25rem]">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-start">
                      <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800 group-hover:border-cyan-500/50 group-hover:bg-cyan-500 group-hover:text-slate-950 font-bold text-xs transition-all">
                        <span>Watch Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
