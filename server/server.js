const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables FIRST, before any other imports
dotenv.config();

const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const Admin = require('./models/Admin');

const app = express();

const normalizeOrigin = (origin) => {
  if (!origin) return null;
  const trimmed = origin.trim().replace(/\/+$/, '');
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const configuredOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins =
  configuredOrigins.length > 0
    ? configuredOrigins
    : ['http://localhost:5173', 'http://localhost:5174'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ensureDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@mini-crm.com';
  const password = process.env.ADMIN_PASSWORD || 'admin12345';

  const existingAdmin = await Admin.findOne({ where: { email: email.toLowerCase() } });
  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashedPassword });
  console.log(`Default admin created: ${email}`);
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to initialize default admin: ${error.message}`);
    process.exit(1);
  }
};

startServer();
