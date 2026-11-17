import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import 'dotenv/config';
import { INITIAL_PROJECTS } from './src/data/portfolioData';
import { VideoProject } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'videos.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

function loadVideos(): VideoProject[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read local videos.json, using INITIAL_PROJECTS:', err);
  }
  return [...INITIAL_PROJECTS];
}

function persistVideos(videos: VideoProject[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write videos to local JSON file (falling back to memory):', err);
  }
}

let inMemoryVideos: VideoProject[] = loadVideos();

// API ROUTES

// Check DB / Storage Status
app.get('/api/db-status', (req, res) => {
  res.json({
    connected: true,
    type: 'local',
    storage: 'Local File Storage',
    error: ''
  });
});

// Admin Password Verification
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || '1425';
  if (password === adminPassword) {
    return res.json({ success: true, token: 'admin-session-active' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect Admin Password' });
});

// GET all videos
app.get('/api/videos', (req, res) => {
  try {
    // If no custom data file exists yet, always reflect latest INITIAL_PROJECTS from portfolioData.ts
    if (!fs.existsSync(DATA_FILE)) {
      inMemoryVideos = [...INITIAL_PROJECTS];
    }
    return res.json({ videos: inMemoryVideos, dbSource: 'local' });
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// POST add new video
app.post('/api/videos', (req, res) => {
  try {
    const videoData = req.body;

    if (!videoData.title || (!videoData.videoUrl && !videoData.youtubeId)) {
      return res.status(400).json({ error: 'Title and video URL/ID are required.' });
    }

    const newId = videoData.id || `proj-${Date.now()}`;
    const newVideo: VideoProject = {
      ...videoData,
      id: newId,
      platform: videoData.platform || 'youtube',
      category: videoData.category || 'vlogs',
      categoryLabel: videoData.categoryLabel || 'Video',
      softwareUsed: videoData.softwareUsed || ['Premiere Pro', 'After Effects'],
      featured: videoData.featured !== undefined ? videoData.featured : true,
      date: videoData.date || new Date().toISOString().slice(0, 7)
    };

    inMemoryVideos = [newVideo, ...inMemoryVideos];
    persistVideos(inMemoryVideos);

    return res.json({ success: true, video: newVideo, dbSource: 'local' });
  } catch (err) {
    console.error('Error adding video:', err);
    res.status(500).json({ error: 'Failed to save video' });
  }
});

// DELETE video by ID
app.delete('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    inMemoryVideos = inMemoryVideos.filter((v) => v.id !== id);
    persistVideos(inMemoryVideos);
    return res.json({ success: true, deletedId: id, dbSource: 'local' });
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// PUT update video by ID
app.put('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let updatedVideo: VideoProject | null = null;
    inMemoryVideos = inMemoryVideos.map((v) => {
      if (v.id === id) {
        updatedVideo = { ...v, ...updateData };
        return updatedVideo;
      }
      return v;
    });

    if (!updatedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }

    persistVideos(inMemoryVideos);
    return res.json({ success: true, video: updatedVideo, dbSource: 'local' });
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// RESET videos (clear custom data and reset to INITIAL_PROJECTS)
app.post('/api/admin/reset', (req, res) => {
  try {
    try {
      if (fs.existsSync(DATA_FILE)) {
        fs.unlinkSync(DATA_FILE);
      }
    } catch (e) {
      console.warn('Could not remove DATA_FILE during reset:', e);
    }
    inMemoryVideos = [...INITIAL_PROJECTS];
    return res.json({ success: true, videos: inMemoryVideos, dbSource: 'local' });
  } catch (err) {
    console.error('Error resetting videos:', err);
    res.status(500).json({ error: 'Failed to reset videos' });
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
