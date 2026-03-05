const express = require('express');
const AINote = require('../models/AINote');
const Note = require('../models/Note');
const { generateNotes, summarizeNote } = require('../services/aiService');
const { extractTextFromFile } = require('../services/fileExtractor');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/ai/generate
// @desc    Generate notes using AI
// @access  Private
router.post('/generate', isAuthenticated, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({ message: 'Please provide a topic' });
    }

    if (topic.length > 200) {
      return res.status(400).json({ message: 'Topic must be less than 200 characters' });
    }

    // Generate notes using Gemini
    const generatedContent = await generateNotes(topic.trim());

    // Save to database
    const aiNote = new AINote({
      topic: topic.trim(),
      generatedContent,
      generatedBy: req.user._id
    });

    await aiNote.save();

    res.json({
      message: 'Notes generated successfully',
      aiNote
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      message: 'Error generating notes', 
      error: error.message 
    });
  }
});

// @route   GET /api/ai/notes
// @desc    Get user's AI generated notes history
// @access  Private
router.get('/notes', isAuthenticated, async (req, res) => {
  try {
    const aiNotes = await AINote.find({ generatedBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ aiNotes });
  } catch (error) {
    console.error('Fetch AI notes error:', error);
    res.status(500).json({ message: 'Error fetching AI notes', error: error.message });
  }
});

// @route   GET /api/ai/notes/:id
// @desc    Get a single AI note
// @access  Private
router.get('/notes/:id', isAuthenticated, async (req, res) => {
  try {
    const aiNote = await AINote.findOne({
      _id: req.params.id,
      generatedBy: req.user._id
    });

    if (!aiNote) {
      return res.status(404).json({ message: 'AI note not found' });
    }

    res.json({ aiNote });
  } catch (error) {
    console.error('Fetch AI note error:', error);
    res.status(500).json({ message: 'Error fetching AI note', error: error.message });
  }
});

// @route   DELETE /api/ai/notes/:id
// @desc    Delete an AI note
// @access  Private
router.delete('/notes/:id', isAuthenticated, async (req, res) => {
  try {
    const aiNote = await AINote.findOneAndDelete({
      _id: req.params.id,
      generatedBy: req.user._id
    });

    if (!aiNote) {
      return res.status(404).json({ message: 'AI note not found' });
    }

    res.json({ message: 'AI note deleted successfully' });
  } catch (error) {
    console.error('Delete AI note error:', error);
    res.status(500).json({ message: 'Error deleting AI note', error: error.message });
  }
});

// @route   POST /api/ai/summarize/:noteId
// @desc    Generate AI summary for an uploaded note
// @access  Public (anyone can view summaries)
router.post('/summarize/:noteId', async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if summary already exists in the note
    if (note.aiSummary) {
      return res.json({ summary: note.aiSummary });
    }

    // Try to extract actual content from the file (PDF/DOCX)
    let extractedContent = null;
    if (note.fileUrl) {
      console.log('Extracting content from:', note.fileType);
      extractedContent = await extractTextFromFile(note.fileUrl, note.fileType);
      if (extractedContent) {
        console.log('Extracted', extractedContent.length, 'characters from document');
      }
    }

    // Generate summary using Gemini (with content if available, metadata as fallback)
    const summary = await summarizeNote(
      note.title,
      note.description,
      note.subject,
      note.tags,
      extractedContent
    );

    // Save summary to the note
    note.aiSummary = summary;
    await note.save();

    res.json({ summary });
  } catch (error) {
    console.error('AI summarize error:', error);
    res.status(500).json({ 
      message: 'Error generating summary', 
      error: error.message 
    });
  }
});

module.exports = router;
