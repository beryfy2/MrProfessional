import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import axios from "axios";        
import crypto from "crypto";      
import Payment from "./models/Payment.js"; 



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: [
    "https://beryfy2-mrpro.vercel.app",
    "https://beryfy2-mrprofession.vercel.app"
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Static uploads
const uploadsDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Mongo setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aditya_singh:Aditya$%40343@addi.0jj4bvg.mongodb.net/mrpro';
mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

// Models
import Employee from './models/Employee.js';
import Enquiry from './models/Enquiry.js';
import NavItem from './models/NavItem.js';
import Title from './models/Title.js';
import Subtitle from './models/Subtitle.js';
import Job from './models/Job.js';
import AdminConfig from './models/AdminConfig.js';
import ResetToken from './models/ResetToken.js';
import Media from './models/Media.js';
import Achievement from "./models/Achievement.js";
import Work from "./models/Work.js";
import phonepeRouter from './routes/phonepe.routes.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// Multer for uploads
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

// KPIs
app.get('/api/kpis', async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const newEnquiries = await Enquiry.countDocuments();
    res.json({
      totalEmployees: { value: totalEmployees, changePct: 12 },
      newEnquiries: { value: newEnquiries, changePct: 18 }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to load KPIs' });
  }
});

// Auth
function signToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.sign(payload, secret, { expiresIn: '2h' });
}

async function getAdminPasswordOk(email, plain) {
  const allowed = process.env.ADMIN_EMAIL || 'beryfy2@gmail.com';
  if (email !== allowed) return false;
  const cfg = await AdminConfig.findOne({ email: allowed });
  if (cfg) return bcrypt.compare(plain || '', cfg.passwordHash);
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (adminPasswordHash) return bcrypt.compare(plain || '', adminPasswordHash);
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) return plain === adminPassword;
  return plain === 'admin123';
}

async function setAdminPassword(email, plain) {
  const hash = await bcrypt.hash(plain || '', 10);
  const existing = await AdminConfig.findOne({ email });
  if (existing) {
    existing.passwordHash = hash;
    await existing.save();
    return existing;
  }
  return AdminConfig.create({ email, passwordHash: hash });
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) {
    throw new Error('SMTP configuration missing: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
  }
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

async function sendOtpEmail(to, otp) {
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('SMTP configuration missing: set FROM_EMAIL');
  const transporter = createTransporter();
  await transporter.verify();
  await transporter.sendMail({
    from,
    to,
    subject: 'Admin Password Reset OTP',
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`
  });
}

function auth(req, res, next) {
  try {
    const authz = req.headers.authorization || '';
    const token = authz.startsWith('Bearer ') ? authz.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || 'beryfy2@gmail.com';
  const ok = await getAdminPasswordOk(email, password || '');

  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken({ role: 'admin', email });
  res.json({ token });
});

app.post('/api/auth/forgot', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    const allowed = process.env.ADMIN_EMAIL || 'beryfy2@gmail.com';
    if (email !== allowed) return res.status(400).json({ error: 'Email not found' });
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await sendOtpEmail(email, otp);
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await ResetToken.create({ email, otpHash, expiresAt });
    return res.json({ ok: true });
  } catch (e) {
    const msg = e?.message || 'Failed to send OTP email';
    return res.status(500).json({ error: msg });
  }
});
 

app.post('/api/auth/reset', async (req, res) => {
  const { email, otp, newPassword } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || 'beryfy2@gmail.com';
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (email !== adminEmail) return res.status(400).json({ error: 'Email not found' });
  const token = await ResetToken.findOne({ email }).sort({ createdAt: -1 });
  if (!token) return res.status(400).json({ error: 'OTP not found' });
  if (token.expiresAt.getTime() < Date.now()) return res.status(400).json({ error: 'OTP expired' });
  const ok = await bcrypt.compare(otp || '', token.otpHash);
  if (!ok) {
    token.attempts += 1;
    await token.save();
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  await setAdminPassword(email, newPassword || '');
  res.json({ ok: true });
});

// ================= MEDIA COVERAGE (ADMIN) =================

app.get('/api/media', async (req, res) => {
  const list = await Media.find().sort({ date: -1 });
  res.json(list);
});

app.get('/api/media/:id', async (req, res) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/media', auth, upload.single('photo'), async (req, res) => {
  try {
    const { publication, title, content, link, date } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;
    
    if (!photo) return res.status(400).json({ error: 'Photo/Logo is required' });

    const item = await Media.create({ 
      publication,
      title, 
      content, 
      link,
      photo,
      date: date || new Date()
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create media item' });
  }
});

app.put('/api/media/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const { publication, title, content, link, date } = req.body;
    const updateData = { publication, title, content, link, date };
    
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const item = await Media.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update media item' });
  }
});

app.delete('/api/media/:id', auth, async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete media item' });
  }
});

// ================= MEDIA COVERAGE (PUBLIC) =================

app.get('/api/public/media', async (req, res) => {
  try {
    const list = await Media.find().sort({ date: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load media items' });
  }
});

// ================= EMPLOYEES =================

app.get('/api/employees', async (req, res) => {
  try {
    const list = await Employee.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load employees' });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const item = await Employee.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Employee not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load employee' });
  }
});

app.post('/api/employees', auth, upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.photoUrl = `/uploads/${req.file.filename}`;
    }
    // Ensure array fields are handled if they come as strings? 
    // The model has mostly strings, but let's check validation.
    // Mongoose handles type casting usually.
    
    const item = await Employee.create(data);
    res.status(201).json(item);
  } catch (e) {
    console.error('Create Employee Error:', e);
    res.status(400).json({ error: 'Failed to create employee' });
  }
});

app.put('/api/employees/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.photoUrl = `/uploads/${req.file.filename}`;
    }

    const item = await Employee.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(item);
  } catch (e) {
    console.error('Update Employee Error:', e);
    res.status(400).json({ error: 'Failed to update employee' });
  }
});

app.delete('/api/employees/:id', auth, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete employee' });
  }
});

// ================= ACHIEVEMENTS (ADMIN) =================

app.get('/api/achievements', async (req, res) => {
  const list = await Achievement.find().sort({ date: -1 });
  res.json(list);
});

app.get('/api/achievements/:id', async (req, res) => {
  try {
    const item = await Achievement.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/achievements', auth, upload.single('photo'), async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;
    
    if (!photo) return res.status(400).json({ error: 'Photo is required' });

    const item = await Achievement.create({ 
      title, 
      content, 
      photo,
      date: date || new Date()
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create achievement' });
  }
});

app.put('/api/achievements/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const updateData = { title, content, date };
    
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const item = await Achievement.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update achievement' });
  }
});

app.delete('/api/achievements/:id', auth, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete achievement' });
  }
});

// ================= ACHIEVEMENTS (PUBLIC) =================

app.get('/api/public/achievements', async (req, res) => {
  try {
    const list = await Achievement.find().sort({ date: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load achievements' });
  }
});

app.get('/api/public/achievements/:id', async (req, res) => {
  try {
    const item = await Achievement.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Achievement not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load achievement' });
  }
});

// ================= WORKS (ADMIN) =================

app.get('/api/works', async (req, res) => {
  const list = await Work.find().sort({ date: -1 });
  res.json(list);
});

app.get('/api/works/:id', async (req, res) => {
  try {
    const item = await Work.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/works', auth, upload.single('photo'), async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (!photo) return res.status(400).json({ error: 'Photo is required' });

    const item = await Work.create({
      title,
      content,
      photo,
      date: date || new Date()
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create work' });
  }
});

app.put('/api/works/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const updateData = { title, content, date };

    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const item = await Work.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update work' });
  }
});

app.delete('/api/works/:id', auth, async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete work' });
  }
});

// ================= WORKS (PUBLIC) =================

app.get('/api/public/works', async (req, res) => {
  try {
    const list = await Work.find().sort({ date: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load works' });
  }
});

app.get('/api/public/works/:id', async (req, res) => {
  try {
    const item = await Work.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Work not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load work' });
  }
});

// Enquiries
app.get('/api/enquiries', async (req, res) => {
  const list = await Enquiry.find().sort({ createdAt: -1 });
  res.json(list);
});

app.get('/api/enquiries/unread-count', async (req, res) => {
  try {
    const count = await Enquiry.countDocuments({ read: false });
    res.json({ count });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});

app.put('/api/enquiries/:id/read', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(enquiry);
  } catch (e) {
    res.status(400).json({ error: 'Failed to mark enquiry as read' });
  }
});

app.post('/api/enquiries', upload.single('file'), async (req, res) => {
  try {
    const { companyName, contactPerson, email, subject, message } = req.body || {};
    if (!email || !subject || !message) return res.status(400).json({ error: 'Missing fields' });
    
    let filePath = null;
    if (req.file) {
      filePath = '/uploads/' + req.file.filename;
    }

    const doc = await Enquiry.create({
      companyName: companyName || 'Careers',
      contactPerson: contactPerson || 'Candidate',
      email,
      subject,
      message,
      file: filePath
    });
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create enquiry' });
  }
});

app.delete('/api/enquiries/:id', auth, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete enquiry' });
  }
});

// Jobs CRUD
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

app.post('/api/jobs', auth, async (req, res) => {
  try {
    const j = await Job.create(req.body);
    res.status(201).json(j);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create job' });
  }
});

app.put('/api/jobs/:id', auth, async (req, res) => {
  try {
    const j = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(j);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update job' });
  }
});

app.delete('/api/jobs/:id', auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
});
// Nav Items
app.get('/api/nav-items', async (req, res) => {
  const items = await NavItem.find().sort({ order: 1 });
  res.json(items);
});

app.get('/api/nav-items/:id', async (req, res) => {
  const item = await NavItem.findById(req.params.id).populate('titles');
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/nav-items', auth, async (req, res) => {
  try {
    const item = await NavItem.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create nav item' });
  }
});

app.put('/api/nav-items/:id', auth, async (req, res) => {
  try {
    const item = await NavItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update nav item' });
  }
});

app.delete('/api/nav-items/:id', auth, async (req, res) => {
  try {
    const navId = req.params.id;
    const titles = await Title.find({ navItem: navId }).select('_id');
    const titleIds = titles.map((t) => t._id);
    if (titleIds.length > 0) {
      await Subtitle.deleteMany({ parentTitleId: { $in: titleIds } });
      await Title.deleteMany({ _id: { $in: titleIds } });
    }
    await NavItem.findByIdAndDelete(navId);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete nav item' });
  }
});
// Titles CRUD
app.get('/api/nav-items/:id/titles', async (req, res) => {
  const titles = await Title.find({ navItem: req.params.id }).sort({ order: 1, createdAt: -1 });
  res.json(titles);
});

app.post('/api/nav-items/:id/titles', auth, async (req, res) => {
  try {
    const t = await Title.create({ ...req.body, navItem: req.params.id });
    await NavItem.findByIdAndUpdate(req.params.id, { $addToSet: { titles: t._id } });
    res.status(201).json(t);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create title' });
  }
});

app.put('/api/titles/:tid', auth, async (req, res) => {
  try {
    const t = await Title.findByIdAndUpdate(req.params.tid, req.body, { new: true });
    res.json(t);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update title' });
  }
});

app.get('/api/titles/:tid', async (req, res) => {
  const t = await Title.findById(req.params.tid);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
});

app.delete('/api/titles/:tid', auth, async (req, res) => {
  try {
    const t = await Title.findByIdAndDelete(req.params.tid);
    if (t) {
      await NavItem.findByIdAndUpdate(t.navItem, { $pull: { titles: t._id } });
      await Subtitle.deleteMany({ parentTitleId: t._id });
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete title' });
  }
});

// Subtitles CRUD
app.get('/api/titles/:tid/subtitles', async (req, res) => {
  const subs = await Subtitle.find({ parentTitleId: req.params.tid }).sort({ createdAt: -1 });
  res.json(subs);
});

app.post('/api/titles/:tid/subtitles', auth, async (req, res) => {
  try {
    const sub = await Subtitle.create({ ...req.body, parentTitleId: req.params.tid });
    res.status(201).json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to create subtitle' });
  }
});

app.get('/api/subtitles/:sid', async (req, res) => {
  const sub = await Subtitle.findById(req.params.sid);
  if (!sub) return res.status(404).json({ error: 'Not found' });
  res.json(sub);
});

function slugifyTitle(text = '') {
  return String(text)
    .toLowerCase()
    .replace(/\.(php|html)$/,'')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/, '-');
}

function slugVariants(slug) {
  const base = slug;
  const reg = `${slug}-registration`;
  const alt = `${slug.replace(/-company$/, '')}-registration`;
  return [base, reg, alt];
}

app.get('/api/subtitles/by-slug/:slug', async (req, res) => {
  const slug = req.params.slug;
  const variants = slugVariants(slug);
  const subs = await Subtitle.find({}).sort({ createdAt: -1 });
  for (const s of subs) {
    const st = slugifyTitle(s.title || '');
    if (variants.includes(st)) {
      return res.json(s);
    }
  }
  res.status(404).json({ error: 'Not found' });
});

app.put('/api/subtitles/:sid', auth, async (req, res) => {
  try {
    const sub = await Subtitle.findByIdAndUpdate(req.params.sid, req.body, { new: true });
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update subtitle' });
  }
});

app.delete('/api/subtitles/:sid', auth, async (req, res) => {
  try {
    await Subtitle.findByIdAndDelete(req.params.sid);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete subtitle' });
  }
});

// Per-question files
app.post('/api/subtitles/:sid/questions/:idx/files', auth, upload.array('files'), async (req, res) => {
  try {
    const idx = Number(req.params.idx);
    const files = (req.files || []).map((f) => ({
      filename: f.filename,
      url: `/uploads/${f.filename}`,
      mimetype: f.mimetype,
      size: f.size
    }));
    const path = `questions.${idx}.files`;
    const sub = await Subtitle.findByIdAndUpdate(
      req.params.sid,
      { $push: { [path]: { $each: files } } },
      { new: true }
    );
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to upload question files' });
  }
});

app.delete('/api/subtitles/:sid/questions/:idx/files/:fileId', auth, async (req, res) => {
  try {
    const idx = Number(req.params.idx);
    const path = `questions.${idx}.files`;
    const sub = await Subtitle.findByIdAndUpdate(
      req.params.sid,
      { $pull: { [path]: { _id: req.params.fileId } } },
      { new: true }
    );
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to remove question file' });
  }
});
app.post('/api/subtitles/:sid/files', auth, upload.array('files', 8), async (req, res) => {
  try {
    const label = req.body?.label ? String(req.body.label) : undefined;
    const files = (req.files || []).map((f, idx) => {
      const key = `customName_${idx}`;
      const cn = req.body && key in req.body ? String(req.body[key]) : undefined;
      return {
        filename: f.filename,
        url: `/uploads/${f.filename}`,
        mimetype: f.mimetype,
        size: f.size,
        label,
        customName: cn || undefined
      };
    });
    const sub = await Subtitle.findByIdAndUpdate(
      req.params.sid,
      { $push: { files: { $each: files } } },
      { new: true }
    );
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to upload files' });
  }
});

app.delete('/api/subtitles/:sid/files/:fileId', auth, async (req, res) => {
  try {
    const sub = await Subtitle.findByIdAndUpdate(
      req.params.sid,
      { $pull: { files: { _id: req.params.fileId } } },
      { new: true }
    );
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to remove file' });
  }
});

// Alternative deletion by filename or url (for legacy records without _id)
app.delete('/api/subtitles/:sid/files', auth, async (req, res) => {
  try {
    const filename = req.query?.filename ? String(req.query.filename) : undefined;
    const url = req.query?.url ? String(req.query.url) : undefined;
    const customName = req.query?.customName ? String(req.query.customName) : undefined;
    const label = req.query?.label ? String(req.query.label) : undefined;
    if (!filename && !url && !customName && !label) {
      return res.status(400).json({ error: 'filename, url, customName or label required' });
    }
    const match =
      filename ? { filename } :
      customName ? { customName } :
      url ? { url } :
      { label };
    const sub = await Subtitle.findByIdAndUpdate(
      req.params.sid,
      { $pull: { files: match } },
      { new: true }
    );
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: 'Failed to remove file' });
  }
});
// Mount PhonePe routes from routes/phonepe.routes.js
app.use('/api/phonepe', phonepeRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
