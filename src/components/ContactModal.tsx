import React, { useState, useEffect } from 'react';
import { X, Send, Mail, Phone, MessageSquare, CheckCircle, Youtube, Linkedin, Github, Instagram, Copy } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialMessage = ''
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('YouTube Editing');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EDITOR_INFO.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden text-left p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Contact Nitish</h3>
              <p className="text-xs text-slate-400">Get in touch for video editing, motion graphics, or long-term edits</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Direct Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="truncate">{EDITOR_INFO.contacts.email}</span>
            </div>
            <button
              onClick={copyEmail}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px]"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <a
            href={EDITOR_INFO.contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center gap-2 font-bold hover:bg-slate-800 transition-colors"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>

        {/* Sent Alert */}
        {sent && (
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            <span>Thank you! Your message has been sent to Nitish. He will reply shortly!</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1">YOUR NAME *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Creator"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1">YOUR EMAIL / DISCORD *</label>
              <input
                type="text"
                required
                placeholder="e.g. alex@youtube.com or Alex#1234"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1">PROJECT TYPE</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none"
            >
              <option value="YouTube Longform">YouTube Longform Video Editing</option>
              <option value="Shorts & TikToks">Viral Shorts & Instagram Reels</option>
              <option value="Gaming & Esports">Gaming / Esports Montage</option>
              <option value="Motion Graphics">3D Motion Graphics & Intros</option>
              <option value="Color Grading">DaVinci Resolve Color Grading</option>
              <option value="Full Channel Management">Full-Time / Recurring Channel Editor</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1">PROJECT DETAILS / MESSAGE *</label>
            <textarea
              required
              rows={4}
              placeholder="Tell Nitish about your video vision, deadline, raw footage link..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-between items-center">
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a href={EDITOR_INFO.contacts.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={EDITOR_INFO.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={EDITOR_INFO.contacts.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={EDITOR_INFO.contacts.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-950 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
