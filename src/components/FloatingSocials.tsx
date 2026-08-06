import React from 'react';
import { MessageCircle, Youtube, Instagram, Facebook, Github, Linkedin } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

export const FloatingSocials: React.FC = () => {
  const socials = [
    {
      name: 'WhatsApp',
      href: EDITOR_INFO.contacts.whatsapp,
      icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />,
      bgColor: 'bg-[#25D366] text-slate-950 hover:bg-[#20bd5a] shadow-[#25D366]/30',
      aria: 'Contact Nitish on WhatsApp'
    },
    {
      name: 'YouTube',
      href: EDITOR_INFO.contacts.youtube,
      icon: <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />,
      bgColor: 'bg-[#FF0000] text-white hover:bg-[#cc0000] shadow-red-600/30',
      aria: 'Visit Nitish YouTube Channel'
    },
    {
      name: 'Instagram',
      href: EDITOR_INFO.contacts.instagram,
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      bgColor: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white hover:opacity-90 shadow-rose-500/30',
      aria: 'Follow Nitish on Instagram'
    },
    {
      name: 'Facebook',
      href: EDITOR_INFO.contacts.facebook,
      icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />,
      bgColor: 'bg-[#1877F2] text-white hover:bg-[#1565c0] shadow-blue-500/30',
      aria: 'Connect on Facebook'
    },
    {
      name: 'GitHub',
      href: EDITOR_INFO.contacts.github,
      icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" />,
      bgColor: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 shadow-slate-900/50',
      aria: 'View Nitish GitHub Profile'
    },
    {
      name: 'LinkedIn',
      href: EDITOR_INFO.contacts.linkedin,
      icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      bgColor: 'bg-[#0A66C2] text-white hover:bg-[#084e96] shadow-blue-600/30',
      aria: 'Connect on LinkedIn'
    }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-row items-center gap-1.5 sm:gap-3 bg-slate-950/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-1.5 sm:p-0 rounded-full border border-slate-800/80 sm:border-0 shadow-2xl sm:shadow-none">
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.aria}
          title={item.name}
          className={`p-2 sm:p-3 rounded-full ${item.bgColor} shadow-md hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative`}
        >
          {item.icon}
          
          {/* Tooltip on hover */}
          <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};
