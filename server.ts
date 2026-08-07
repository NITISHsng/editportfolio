import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.json());

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
let lastMongoError = '';
let lastConnectAttempt = 0;

// Attempt MongoDB Connection
export async function connectMongoDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log('ℹ️ MONGODB_URI not provided in env.');
    lastMongoError = 'MONGODB_URI not configured in environment variables';
    isMongoConnected = false;
    return false;
  }

  if (mongoose.connection.readyState >= 1) {
    isMongoConnected = true;
    lastMongoError = '';
    return true;
  }

  lastConnectAttempt = Date.now();

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 7000 });
    isMongoConnected = true;
    lastMongoError = '';
    console.log('✅ Connected to MongoDB database successfully!');
    return true;
  } catch (err) {
    const msg = (err as Error).message;
    console.warn('⚠️ MongoDB connection failed:', msg);
    isMongoConnected = false;
    lastMongoError = msg;
    return false;
  }
}

connectMongoDB();

// Ensure DB connection on request
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState >= 1) {
    isMongoConnected = true;
  } else if (process.env.MONGODB_URI) {
    // In serverless or on connection loss, attempt connection
    if (Date.now() - lastConnectAttempt > 5000) {
      await connectMongoDB();
    }
  }
  next();
});

// API ROUTES

// Check DB Status
app.get('/api/db-status', (req, res) => {
  res.json({
    connected: isMongoConnected,
    type: isMongoConnected ? 'mongodb' : 'none',
    uriConfigured: Boolean(process.env.MONGODB_URI),
    error: lastMongoError
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
      return res.json({ videos: [], dbSource: 'none', warning: 'MongoDB is not connected.' });
    }
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// POST add new video
app.post('/api/videos', async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.status(503).json({ error: 'MongoDB connection is required to add videos.' });
    }

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

    const created = await VideoModel.create(payload);
    return res.json({ success: true, video: created, dbSource: 'mongodb' });
  } catch (err) {
    console.error('Error adding video:', err);
    res.status(500).json({ error: 'Failed to save video to database' });
  }
});

// DELETE video by ID
app.delete('/api/videos/:id', async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.status(503).json({ error: 'MongoDB connection is required to delete videos.' });
    }

    const { id } = req.params;
    await VideoModel.deleteOne({ id });
    return res.json({ success: true, deletedId: id, dbSource: 'mongodb' });
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// PUT update video by ID
app.put('/api/videos/:id', async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.status(503).json({ error: 'MongoDB connection is required to update videos.' });
    }

    const { id } = req.params;
    const updateData = req.body;

    const updated = await VideoModel.findOneAndUpdate({ id } as any, updateData as any, { new: true } as any);
    return res.json({ success: true, video: updated, dbSource: 'mongodb' });
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// RESET videos (clear database)
app.post('/api/admin/reset', async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.status(503).json({ error: 'MongoDB connection is required to reset database.' });
    }

    await VideoModel.deleteMany({});
    return res.json({ success: true, videos: [], dbSource: 'mongodb' });
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
