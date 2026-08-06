import { VideoProject, Testimonial, SkillCategory } from '../types';

export const EDITOR_INFO = {
  name: 'Nitish Ch Singha',
  role: 'Professional Video Editor & Motion Graphics Specialist',
  degree: 'B.Tech 4th Year - Computer Science & Engineering (CSE)',
  bio: 'Bridging technical computational logic with high-impact visual storytelling. Specialized in YouTube retention editing, fast-paced motion graphics, sound design, and 3D visual FX. Over 10,000,000+ client views generated.',
  stats: [
    { label: 'Total Client Views', value: '10M+', icon: 'Eye' },
    { label: 'Completed Projects', value: '150+', icon: 'Video' },
    { label: 'Retention Increase', value: '+85%', icon: 'TrendingUp' },
    { label: 'Client Rating', value: '4.95/5', icon: 'Star' }
  ],
  contacts: {
    email: 'nitishsingha829@gmail.com',
    location: 'India',
    github: 'https://github.com/NITISHsng',
    linkedin: 'https://www.linkedin.com/in/n1715h',
    youtube: 'https://www.youtube.com/@quickhelp260',
    instagram: 'https://www.instagram.com/its_n1715h/',
    facebook: 'https://www.facebook.com/n1715h',
    whatsapp: 'https://wa.me/917001181488?text=Hi%20Nitish,%20I%20want%20to%20discuss%20a%20video%20editing%20project!'
  }
};

export const INITIAL_PROJECTS: VideoProject[] = [];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Video Editing & VFX Tools',
    skills: [
      { name: 'Adobe Premiere Pro', level: 95, iconName: 'Film' },
      { name: 'Adobe After Effects', level: 92, iconName: 'Sparkles' },
      { name: 'DaVinci Resolve (Color & Fairlight)', level: 88, iconName: 'Palette' },
      { name: 'Blender 3D Modeling & Camera', level: 80, iconName: 'Box' },
      { name: 'Sound Design & Audio Mastering', level: 86, iconName: 'Volume2' }
    ]
  },
  {
    title: 'Computer Science (B.Tech CSE) & AI Tech',
    skills: [
      { name: 'Python (Automated Video Processing & Scripting)', level: 90, iconName: 'Code' },
      { name: 'After Effects Expressions (JavaScript Logic)', level: 92, iconName: 'Cpu' },
      { name: 'Data Structures & Algorithms (CSE)', level: 85, iconName: 'Binary' },
      { name: 'FFmpeg & CLI Video Transcoding', level: 88, iconName: 'Terminal' },
      { name: 'AI Voice & Speech-to-Text Pipeline Integrations', level: 85, iconName: 'Wand2' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Alex Mercer',
    role: 'Lead Creator',
    channelName: 'TechXplore Studio',
    subscribers: '850K Subscribers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'Nitish transformed our channel retention overnight. His CS background allows him to write custom AE expressions and process footage faster than any editor I have worked with. Our average watch time shot up from 35% to 68%!',
    rating: 5,
    projectTitle: 'Cyberpunk Desk Setup Review'
  },
  {
    id: 't-2',
    name: 'David Vance',
    role: 'Esports Director',
    channelName: 'Nexus Gaming Clan',
    subscribers: '1.4M Subscribers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'The beat timing, velocity ramps, and 3D Blender intros Nitish builds for our Valorant edits are mind-blowing. He delivered a 4K 120fps montage in under 48 hours. Absolute professional!',
    rating: 5,
    projectTitle: 'VCT Masters Highlights'
  },
  {
    id: 't-3',
    name: 'Sarah Chen',
    role: 'Marketing Lead',
    channelName: 'DevFlow SaaS',
    subscribers: 'Tech Company',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    quote: 'Nitish understands both code and design. He turned our dry technical SaaS platform into a high-converting 3D video advertisement. Highly recommended for tech brands!',
    rating: 5,
    projectTitle: 'NextGen AI Product Launch'
  }
];

export const EDITOR_TIMELINE_SAMPLE = [
  {
    id: 'track-v2',
    name: 'V2: Motion & VFX',
    type: 'vfx' as const,
    color: 'bg-purple-500/80 border-purple-400',
    clips: [
      { id: 'c1', title: '3D Lens Flare', startPercent: 10, widthPercent: 20, effect: '3D Track' },
      { id: 'c2', title: 'Cyber Callout HUD', startPercent: 35, widthPercent: 25, effect: 'Expression Rig' },
      { id: 'c3', title: 'Speed Ramp Transition', startPercent: 70, widthPercent: 15, effect: 'Optical Flow' }
    ]
  },
  {
    id: 'track-v1',
    name: 'V1: Main A-Roll / Footage',
    type: 'video' as const,
    color: 'bg-cyan-600/80 border-cyan-400',
    clips: [
      { id: 'c4', title: 'A-Roll Hook Intro', startPercent: 0, widthPercent: 25 },
      { id: 'c5', title: 'B-Roll Cinematic Pan', startPercent: 25, widthPercent: 30 },
      { id: 'c6', title: 'Product Macro Shot', startPercent: 55, widthPercent: 25 },
      { id: 'c7', title: 'Outro & CTA Screen', startPercent: 80, widthPercent: 20 }
    ]
  },
  {
    id: 'track-a1',
    name: 'A1: Voiceover & Dialogue',
    type: 'audio' as const,
    color: 'bg-emerald-600/80 border-emerald-400',
    clips: [
      { id: 'c8', title: 'Clean VO (iZotope Denoise)', startPercent: 0, widthPercent: 95 }
    ]
  },
  {
    id: 'track-a2',
    name: 'A2: Sound FX & Impact',
    type: 'audio' as const,
    color: 'bg-amber-500/80 border-amber-300',
    clips: [
      { id: 'c9', title: 'Whoosh Bass Drop', startPercent: 24, widthPercent: 8 },
      { id: 'c10', title: 'Glitch SFX', startPercent: 34, widthPercent: 6 },
      { id: 'c11', title: 'Sub Boom Impact', startPercent: 69, widthPercent: 10 }
    ]
  }
];
