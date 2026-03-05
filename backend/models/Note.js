const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  semester: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  filePublicId: {
    type: String
  },
  fileType: {
    type: String
  },
  fileName: {
    type: String
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  aiSummary: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for searching
noteSchema.index({ title: 'text', subject: 'text', description: 'text' });

module.exports = mongoose.model('Note', noteSchema);
