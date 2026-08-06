import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to local JSON fallback database
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'videos.json');

// Initial seed data
const DEFAULT_VIDEOS = [
  {
    id: 'proj-1',
    title: 'Ultimate Tech & Cyberpunk Desk Setup 2026',
    platform: 'youtube' as const,
    youtubeId: 'ScMzIvxBSi4',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    category: 'vlogs',
    categoryLabel: 'Tech & Vlogs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    duration: '12:45',
    viewsCount: '1.2M',
    retentionBoost: '88% AVG Retention',
    clientName: 'TechXplore Studio',
    softwareUsed: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    description: 'High-energy tech review video featuring dynamic callouts, custom 3D HUD motion graphics, seamless speed ramping, and pristine sound design.',
    highlights: ['Custom 3D tracking callouts', 'Complex audio layering'],
    featured: true,
    date: '2026-02'
  },
  {
    id: 'proj-2',
    title: 'Valorant VCT Masters Highlights & Motion Intro',
    platform: 'youtube' as const,
    youtubeId: '1-82m4l4I8U',
    videoUrl: 'https://www.youtube.com/watch?v=1-82m4l4I8U',
    category: 'gaming',
    categoryLabel: 'Gaming & Esport',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    duration: '08:30',
    viewsCount: '850K',
    retentionBoost: '92% Click-Through',
    clientName: 'ProGamer Central',
    softwareUsed: ['Premiere Pro', 'After Effects', 'Boris FX'],
    description: 'Fast-paced espsorts kill montage with frame-perfect beat sync, sound effects, motion graphics, and kill cam zooms.',
    highlights: ['Beat-matched speed ramps', '3D motion intro'],
    featured: true,
    date: '2026-01'
  },
  {
    id: 'proj-7',
    title: 'Instagram Motion Reel: 3D Kinetic Typography',
    platform: 'instagram' as const,
    videoUrl: 'https://www.instagram.com/reel/C321xXyZ123/',
    category: 'shorts',
    categoryLabel: 'Instagram Reel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
    duration: '00:45',
    viewsCount: '2.1M',
    retentionBoost: '94% Engagement',
    clientName: '@its_n1715h Instagram',
    softwareUsed: ['After Effects', 'Premiere Pro', 'DaVinci Resolve'],
    description: 'High-octane Instagram Reel featuring fast-paced kinetic typography, sound design syncs, and color grading tuned for mobile screens.',
    highlights: ['Custom motion graphics for vertical 9:16', 'Punchy SFX'],
    featured: true,
    date: '2026-02'
  },
  {
    id: 'proj-8',
    title: 'Facebook Commercial Ad: Viral Product Promo',
    platform: 'facebook' as const,
    videoUrl: 'https://www.facebook.com/watch/?v=123456789012345',
    category: 'commercial',
    categoryLabel: 'Facebook Video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    duration: '01:15',
    viewsCount: '3.5M',
    retentionBoost: '89% Conversion Rate',
    clientName: 'Global E-Commerce Brand',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    description: 'High-converting Facebook feed ad designed for silent viewing with bold captions, visual hooks, and fast pacing.',
    highlights: ['Hook-driven opening for feed autoplay', 'Clear on-screen subtitles'],
    featured: true,
    date: '2026-03'
  }
];

// Ensure local fallback database exists
function initLocalDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_VIDEOS, null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('Local file system is read-only or restricted. Using in-memory fallback.');
  }
}
initLocalDb();

function readLocalDb(): any[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading local JSON db:', err);
  }
  return DEFAULT_VIDEOS;
}

function writeLocalDb(videos: any[]) {
  try {
    initLocalDb();
    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(videos, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error writing local JSON db:', err);
  }
}

// Mongoose Schema & Model for MongoDB
const VideoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  platform: { type: String, enum: ['youtube', 'instagram', 'facebook'], default: 'youtube' },
  youtubeId: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  category: { type: String, default: 'vlogs' },
  categoryLabel: { type: String, default: 'Video' },
  thumbnailUrl: { type: String, default: '' },
  duration: { type: String, default: '01:00' },
  viewsCount: { type: String, default: '100K+' },
  retentionBoost: { type: String, default: '90% Retention' },
  clientName: { type: String, default: 'Client Project' },
  softwareUsed: { type: [String], default: ['Premiere Pro', 'After Effects'] },
  description: { type: String, default: '' },
  highlights: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  date: { type: String, default: new Date().toISOString().slice(0, 7) }
}, { timestamps: true });

const VideoModel = mongoose.models.Video || mongoose.model('Video', VideoSchema);

let isMongoConnected = false;

// Attempt MongoDB Connection
async function connectMongoDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log('ℹ️ MONGODB_URI not provided in env. Using local persistent storage.');
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    isMongoConnected = true;
    return;
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB database successfully!');
    
    // Seed default videos if database is empty
    const count = await VideoModel.countDocuments();
    if (count === 0) {
      await VideoModel.insertMany(DEFAULT_VIDEOS as any);
      console.log('🌱 MongoDB seeded with default portfolio videos.');
    }
  } catch (err) {
    console.warn('⚠️ MongoDB connection attempt failed. Falling back to local storage:', (err as Error).message);
    isMongoConnected = false;
  }
}

connectMongoDB();

// Ensure DB connection on every request
app.use(async (req, res, next) => {
  if (!isMongoConnected && process.env.MONGODB_URI) {
    await connectMongoDB();
  }
  next();
});

// API ROUTES

// Check DB Status
app.get('/api/db-status', (req, res) => {
  res.json({
    connected: isMongoConnected,
    type: isMongoConnected ? 'mongodb' : 'local',
    uriConfigured: Boolean(process.env.MONGODB_URI)
  });
});

// Admin Password Verification
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (password === adminPassword) {
    return res.json({ success: true, token: 'admin-session-active' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect Admin Password' });
});

// GET all videos
app.get('/api/videos', async (req, res) => {
  try {
    if (isMongoConnected) {
      const videos = await VideoModel.find().sort({ createdAt: -1 });
      return res.json({ videos, dbSource: 'mongodb' });
    } else {
      const videos = readLocalDb();
      return res.json({ videos, dbSource: 'local' });
    }
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// POST add new video
app.post('/api/videos', async (req, res) => {
  try {
    const videoData = req.body;

    if (!videoData.title || (!videoData.videoUrl && !videoData.youtubeId)) {
      return res.status(400).json({ error: 'Title and video URL/ID are required.' });
    }

    const newId = videoData.id || `proj-${Date.now()}`;
    const payload = {
      ...videoData,
      id: newId,
      platform: videoData.platform || 'youtube',
      category: videoData.category || 'vlogs',
      categoryLabel: videoData.categoryLabel || 'Video',
      softwareUsed: videoData.softwareUsed || ['Premiere Pro', 'After Effects'],
      highlights: videoData.highlights || ['Professional Edit', 'Audio Mastered'],
      featured: videoData.featured !== undefined ? videoData.featured : true,
      date: videoData.date || new Date().toISOString().slice(0, 7)
    };

    if (isMongoConnected) {
      const created = await VideoModel.create(payload);
      return res.json({ success: true, video: created, dbSource: 'mongodb' });
    } else {
      const videos = readLocalDb();
      videos.unshift(payload);
      writeLocalDb(videos);
      return res.json({ success: true, video: payload, dbSource: 'local' });
    }
  } catch (err) {
    console.error('Error adding video:', err);
    res.status(500).json({ error: 'Failed to save video to database' });
  }
});

// DELETE video by ID
app.delete('/api/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      await VideoModel.deleteOne({ id });
      return res.json({ success: true, deletedId: id, dbSource: 'mongodb' });
    } else {
      let videos = readLocalDb();
      videos = videos.filter((v: any) => v.id !== id);
      writeLocalDb(videos);
      return res.json({ success: true, deletedId: id, dbSource: 'local' });
    }
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// PUT update video by ID
app.put('/api/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoConnected) {
      const updated = await VideoModel.findOneAndUpdate({ id } as any, updateData as any, { new: true } as any);
      return res.json({ success: true, video: updated, dbSource: 'mongodb' });
    } else {
      let videos = readLocalDb();
      const index = videos.findIndex((v: any) => v.id === id);
      if (index !== -1) {
        videos[index] = { ...videos[index], ...updateData, id }; // Ensure ID stays the same
        writeLocalDb(videos);
        return res.json({ success: true, video: videos[index], dbSource: 'local' });
      }
      return res.status(404).json({ error: 'Video not found' });
    }
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// RESET videos to default
app.post('/api/admin/reset', async (req, res) => {
  try {
    if (isMongoConnected) {
      await VideoModel.deleteMany({});
      await VideoModel.insertMany(DEFAULT_VIDEOS as any);
      const videos = await VideoModel.find();
      return res.json({ success: true, videos, dbSource: 'mongodb' });
    } else {
      writeLocalDb(DEFAULT_VIDEOS);
      return res.json({ success: true, videos: DEFAULT_VIDEOS, dbSource: 'local' });
    }
  } catch (err) {
    console.error('Error resetting database:', err);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});


// VITE MIDDLEWARE & SERVER STARTUP
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack Portfolio Server running on http://localhost:${PORT}`);
  });
}

export default app;

if (!process.env.VERCEL) {
  startServer();
}
