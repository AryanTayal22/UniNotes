const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to MongoDB (non-blocking)
connectDB();

const app = express();

// Trust proxy for production (needed for secure cookies behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
};

// Add MongoDB session store only if MONGODB_URI is set
if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb')) {
  try {
    const MongoStore = require('connect-mongo');
    sessionConfig.store = MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60
    });
    console.log('MongoDB session store configured');
  } catch (err) {
    console.log('Using memory session store:', err.message);
  }
}

app.use(session(sessionConfig));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'UniNotes API is running' });
});

// Start server - bind to 0.0.0.0 for Render
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
