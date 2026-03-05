const mongoose = require('mongoose');

const aiNoteSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },
  generatedContent: {
    type: String,
    required: true
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AINote', aiNoteSchema);
