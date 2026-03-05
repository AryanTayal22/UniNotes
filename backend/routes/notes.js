const express = require('express');
const Note = require('../models/Note');
const { upload } = require('../config/cloudinary');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/notes
// @desc    Upload a new note
// @access  Private
router.post('/', isAuthenticated, upload.single('file'), async (req, res) => {
  try {
    const { title, subject, semester, description, tags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }

    // Log file info for debugging
    console.log('Uploaded file info:', req.file);

    // Parse tags if it's a string
    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    }

    // Get the secure URL from the file object
    const fileUrl = req.file.path || req.file.secure_url || req.file.url;

    const note = new Note({
      title,
      subject,
      semester,
      description,
      tags: parsedTags,
      fileUrl: fileUrl,
      filePublicId: req.file.filename || req.file.public_id,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
      uploadedBy: req.user._id
    });

    await note.save();

    res.status(201).json({
      message: 'Note uploaded successfully',
      note
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading note', error: error.message });
  }
});

// @route   GET /api/notes
// @desc    Get all notes with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { subject, semester, tags, search, page = 1, limit = 12 } = req.query;

    // Build filter object
    const filter = {};

    if (subject) {
      filter.subject = { $regex: subject, $options: 'i' };
    }

    if (semester) {
      filter.semester = semester;
    }

    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      filter.tags = { $in: tagArray };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notes = await Note.find(filter)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Note.countDocuments(filter);

    res.json({
      notes,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Browse error:', error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
});

// @route   GET /api/notes/:id
// @desc    Get a single note by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('uploadedBy', 'name university');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ message: 'Error fetching note', error: error.message });
  }
});

// @route   GET /api/notes/:id/download
// @desc    Track download and return file URL
// @access  Public
router.get('/:id/download', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ fileUrl: note.fileUrl, fileName: note.fileName });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Error downloading note', error: error.message });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private (owner only)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if user is the owner
    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});

// @route   GET /api/users/me/notes
// @desc    Get current user's uploaded notes
// @access  Private
router.get('/user/me', isAuthenticated, async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ notes });
  } catch (error) {
    console.error('User notes error:', error);
    res.status(500).json({ message: 'Error fetching user notes', error: error.message });
  }
});

module.exports = router;
