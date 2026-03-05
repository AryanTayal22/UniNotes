const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, university, branch } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      university,
      branch
    });

    await user.save();

    // Log in the user after signup
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after signup' });
      }
      res.status(201).json({
        message: 'User registered successfully',
        user
      });
    });

  } catch (error) {
    console.error('Signup error:', error.message);
    console.error('Full error:', error.stack);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message,
      stack: error.stack 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error during login' });
    }
    
    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error establishing session' });
      }
      res.json({
        message: 'Login successful',
        user
      });
    });
  })(req, res, next);
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
