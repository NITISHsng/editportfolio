export interface VideoProject {
  id: string;
  title: string;
  platform?: 'youtube' | 'instagram' | 'facebook';
  youtubeId?: string;
  videoUrl?: string;
  category: 'vlogs' | 'gaming' | 'shorts' | 'motion' | 'cinematic' | 'commercial';
  categoryLabel: string;
  thumbnailUrl: string;
  duration: string;
  viewsCount: string;
  retentionBoost: string;
  clientName: string;
  clientSubscribers?: string;
  softwareUsed: string[];
  description: string;
  highlights: string[];
  beforeAfterComparison?: {
    rawDesc: string;
    editedDesc: string;
    rawImage: string;
    editedImage: string;
  };
  featured?: boolean;
  date: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; iconName: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  channelName: string;
  subscribers?: string;
  avatar: string;
  quote: string;
  rating: number;
  projectTitle: string;
}

export interface EstimationParams {
  videoType: 'youtube' | 'short' | 'commercial' | 'gaming' | 'motion';
  rawDurationMinutes: number;
  hasColorGrading: boolean;
  hasSoundDesign: boolean;
  hasMotionGraphics: boolean;
  hasSubtitles: boolean;
  has3DElements: boolean;
  urgencyDays: number;
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'vfx' | 'text';
  color: string;
  clips: {
    id: string;
    title: string;
    startPercent: number;
    widthPercent: number;
    effect?: string;
  }[];
}
