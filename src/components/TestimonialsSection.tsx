import React from 'react';
import { Star, Quote, Award, MessageSquare, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

interface TestimonialsSectionProps {
  onOpenContact: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>CLIENT TESTIMONIALS & REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Trusted by <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">YouTube Creators & Tech Brands</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Here is what channel owners, esports managers, and SaaS founders say about working with Nitish Chandra Singha.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 shadow-xl transition-all space-y-5 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-800 group-hover:text-amber-500/30 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {t.role} &bull; <span className="text-cyan-400 font-medium">{t.channelName}</span>
                  </p>
                  {t.subscribers && (
                    <span className="inline-block mt-0.5 text-[10px] font-mono text-purple-300">
                      {t.subscribers}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center space-y-4 max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to Upgrade Your YouTube Channel's Visual Quality & Retention?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Whether you need a single viral short edit or a full-time recurring longform YouTube editor, Nitish delivers within 24-48 hours.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Project Discussion With Nitish</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
