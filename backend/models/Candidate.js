const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    enum: ['Applying Period', 'Screening', 'Interview', 'Test'],
    default: 'Applying Period'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  isReferral: {
    type: Boolean,
    default: false
  },
  assessmentStatus: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  details: {
    email: String,
    phone: String,
    position: String,
    experience: Number,
    skills: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Candidate', candidateSchema); 