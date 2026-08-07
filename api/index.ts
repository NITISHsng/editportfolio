import app, { connectMongoDB } from '../server';

export default async function handler(req: any, res: any) {
  try {
    await connectMongoDB();
  } catch (err) {
    console.error('Vercel serverless DB connection error:', err);
  }
  return app(req, res);
}