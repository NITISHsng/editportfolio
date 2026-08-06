import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Database, ShieldCheck, Plus, Trash2, Youtube, Instagram, Facebook, 
  RefreshCw, CheckCircle2, AlertCircle, Sparkles, Key, HardDrive, Search, Edit2
} from 'lucide-react';
import { VideoProject } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoProject[];
  onRefreshVideos: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  videos,
  onRefreshVideos
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'edit'>('manage');
  const [editingId, setEditingId] = useState<string | null>(null);

  const clearForm = () => {
    setVideoUrl('');
    setTitle('');
    setClientName('');
    setDescription('');
    setEditingId(null);
  };

  // DB Status state
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; type: string; uriConfigured: boolean }>({
    connected: false,
    type: 'local',
    uriConfigured: false
  });

  // Add Video Form State
  const [platform, setPlatform] = useState<'youtube' | 'instagram' | 'facebook'>('youtube');
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VideoProject['category']>('vlogs');
  const [clientName, setClientName] = useState('');
  const [viewsCount, setViewsCount] = useState('500K');
  const [duration, setDuration] = useState('01:00');
  const [softwareUsed, setSoftwareUsed] = useState('Premiere Pro, After Effects');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingSuccess, setDeletingSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch DB Status
  const fetchDbStatus = async () => {
    try {
      const res = await fetch('/api/db-status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      }
    } catch (err) {
      console.error('Failed to fetch DB status', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDbStatus();
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setAuthError(data.error || 'Incorrect passcode');
      }
    } catch (err) {
      // Fallback local check if server unreachable
      const fallbackPassword = (import.meta as any).env?.VITE_ADMIN_PASSWORD;
      if (passwordInput === fallbackPassword) {
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setAuthError('Invalid passcode');
      }
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!title.trim() || !videoUrl.trim()) {
      setFormError('Title and Video Link/ID are required.');
      return;
    }

    setIsSubmitting(true);

    let ytId = '';
    let thumb = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop';

    if (platform === 'youtube') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = videoUrl.trim().match(regExp);
      ytId = match && match[2].length === 11 ? match[2] : (videoUrl.trim().length === 11 ? videoUrl.trim() : 'ScMzIvxBSi4');
      thumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    } else if (platform === 'instagram') {
      thumb = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop';
    } else if (platform === 'facebook') {
      thumb = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop';
    }

    const categoryLabels: Record<VideoProject['category'], string> = {
      vlogs: 'Tech & Vlogs',
      gaming: 'Gaming & Esport',
      shorts: 'Vertical Reel',
      motion: 'Motion Graphics',
      cinematic: 'Cinematic Edit',
      commercial: 'Commercial Ad'
    };

    const newVideo = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      platform,
      youtubeId: ytId,
      videoUrl: videoUrl.trim(),
      category,
      categoryLabel: categoryLabels[category],
      thumbnailUrl: thumb,
      duration: duration || '01:00',
      viewsCount: viewsCount || '500K',
      retentionBoost: '92% Retention',
      clientName: clientName.trim() || 'Client Project',
      softwareUsed: softwareUsed.split(',').map(s => s.trim()).filter(Boolean),
      description: description.trim() || 'Professional video project added via Admin Panel.',
      highlights: ['Custom Motion FX', 'Pristine Audio Mix'],
      featured: true,
      date: new Date().toISOString().slice(0, 7)
    };

    try {
      const isEdit = !!editingId;
      const url = isEdit ? `/api/videos/${editingId}` : '/api/videos';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo)
      });

      if (res.ok) {
        setFormSuccess(isEdit ? 'Video project updated successfully!' : 'Video project added successfully to database!');
        clearForm();
        onRefreshVideos();
        if (isEdit) {
          setTimeout(() => setActiveTab('manage'), 1500);
        }
        setTimeout(() => setFormSuccess(''), 4000);
      } else {
        setFormError('Failed to save video to database.');
      }
    } catch (err) {
      setFormError('Network error trying to save video.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVideo = async (id: string, videoTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${videoTitle}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setDeletingSuccess(`Deleted "${videoTitle}"`);
        onRefreshVideos();
        setTimeout(() => setDeletingSuccess(''), 3000);
      } else {
        alert('Failed to delete video.');
      }
    } catch (err) {
      alert('Error deleting video.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database to default videos? Custom added videos will be reset.')) return;

    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      if (res.ok) {
        onRefreshVideos();
        alert('Database reset to default seed videos.');
      }
    } catch (err) {
      alert('Error resetting database.');
    }
  };

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 animate-in fade-in duration-200">
      
      <div className="relative w-full h-full flex flex-col text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Portfolio Admin Panel</h3>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    AUTHENTICATED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Manage video projects and MongoDB database</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        {!isAuthenticated ? (
          /* LOGIN STEP */
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
            <div className="w-full max-w-md space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Admin Security Passcode</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Enter your admin password to access video deletion, database management, and project publishing controls.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyan-300 mb-1">
                    ADMIN PASSCODE
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="Enter password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 text-white text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                    />
                    <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Admin Dashboard</span>
              </button>

            </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col items-center w-full overflow-hidden bg-slate-950/40">
            <div className="w-full max-w-5xl flex flex-col flex-1 shadow-2xl border-x border-slate-800/50 bg-slate-900 overflow-hidden">
            
            {/* Database Connection Status Header */}
            <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-slate-300">Database Engine:</span>
                {dbStatus.connected ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-[11px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    MongoDB Atlas Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono font-bold text-[11px] flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-cyan-400" />
                    Local Persistent Storage ({videos.length} videos)
                  </span>
                )}
              </div>

              <button
                onClick={handleResetDatabase}
                className="text-[11px] font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                title="Reset database to initial default video projects"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Seed Data</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-4 px-6 pt-3 bg-slate-950/60 border-b border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('manage')}
                className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'manage'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Manage Videos ({videos.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('add'); clearForm(); }}
                className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'add'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add New Video Link</span>
              </button>

              {activeTab === 'edit' && (
                <button
                  className="pb-3 border-b-2 flex items-center gap-2 transition-colors border-blue-400 text-blue-300"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Video</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
              
              {/* TAB 1: MANAGE & DELETE VIDEOS */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  
                  {deletingSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{deletingSuccess}</span>
                    </div>
                  )}

                  {/* Search Filter */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search videos by title or client..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  </div>

                  {/* Video Items List */}
                  <div className="space-y-2.5">
                    {filteredVideos.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400">
                        No videos found matching your search.
                      </div>
                    ) : (
                      filteredVideos.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Thumbnail */}
                            <div className="relative w-20 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                              <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                              <div className="absolute top-1 left-1">
                                {item.platform === 'instagram' ? (
                                  <Instagram className="w-3.5 h-3.5 text-rose-400 drop-shadow" />
                                ) : item.platform === 'facebook' ? (
                                  <Facebook className="w-3.5 h-3.5 text-blue-400 drop-shadow" />
                                ) : (
                                  <Youtube className="w-3.5 h-3.5 text-red-500 drop-shadow" />
                                )}
                              </div>
                            </div>

                            {/* Details */}
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-mono">
                                <span className="capitalize text-cyan-400">{item.platform || 'youtube'}</span>
                                <span>&bull;</span>
                                <span className="truncate">{item.clientName}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            {/* Edit Action Button */}
                            <button
                              onClick={() => {
                                setEditingId(item.id);
                                setPlatform(item.platform as any);
                                setVideoUrl(item.videoUrl || '');
                                setTitle(item.title);
                                setCategory(item.category);
                                setClientName(item.clientName);
                                setDescription(item.description);
                                setViewsCount(item.viewsCount);
                                setDuration(item.duration);
                                setSoftwareUsed(item.softwareUsed ? item.softwareUsed.join(', ') : '');
                                setActiveTab('edit');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/30 hover:border-blue-500/60 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            {/* Delete Action Button */}
                            <button
                              onClick={() => handleDeleteVideo(item.id, item.title)}
                              disabled={deletingId === item.id}
                              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/30 hover:border-red-500/60 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{deletingId === item.id ? 'Deleting...' : 'Delete'}</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2 & 3: ADD / EDIT VIDEO LINK */}
              {(activeTab === 'add' || activeTab === 'edit') && (
                <div className="space-y-4">
                  {formSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{formSuccess}</span>
                    </div>
                  )}

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-950 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddVideo} className="space-y-4">
                    
                    {/* Platform Selection */}
                    <div>
                      <label className="block text-xs font-mono text-cyan-300 mb-1.5">
                        PLATFORM *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPlatform('youtube')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            platform === 'youtube'
                              ? 'bg-red-950 border-red-500 text-red-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Youtube className="w-4 h-4" />
                          <span>YouTube</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPlatform('instagram')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            platform === 'instagram'
                              ? 'bg-rose-950 border-rose-500 text-rose-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Instagram className="w-4 h-4" />
                          <span>Instagram</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPlatform('facebook')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            platform === 'facebook'
                              ? 'bg-blue-950 border-blue-500 text-blue-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Facebook</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-300 mb-1">
                        {platform === 'youtube' ? 'YOUTUBE LINK OR ID *' : platform === 'instagram' ? 'INSTAGRAM REEL LINK *' : 'FACEBOOK VIDEO LINK *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          platform === 'youtube'
                            ? 'https://www.youtube.com/watch?v=ScMzIvxBSi4'
                            : platform === 'instagram'
                            ? 'https://www.instagram.com/reel/C321xXyZ123/'
                            : 'https://www.facebook.com/watch/?v=123456789'
                        }
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-300 mb-1">
                        PROJECT TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3D Kinetic Motion Edit 2026"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-cyan-300 mb-1">
                          CATEGORY
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
                        >
                          <option value="vlogs">Tech & Vlogs</option>
                          <option value="gaming">Gaming & Esport</option>
                          <option value="shorts">Vertical Reel / Short</option>
                          <option value="motion">Motion Graphics</option>
                          <option value="cinematic">Cinematic Edit</option>
                          <option value="commercial">Commercial Ad</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-cyan-300 mb-1">
                          CLIENT NAME
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Brand Name / Self"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-300 mb-1">
                        PROJECT DESCRIPTION
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Describe editing techniques, software used, or retention strategy..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      {activeTab === 'edit' ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span>{isSubmitting ? 'Saving to Database...' : (activeTab === 'edit' ? 'Update Video' : 'Add Video to Database')}</span>
                    </button>
                  </form>
                </div>
              )}

            </div>

            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-500">
            {isAuthenticated ? 'Admin Session Active' : 'Protected Area'}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
