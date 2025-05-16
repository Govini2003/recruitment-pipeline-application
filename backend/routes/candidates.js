const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ applicationDate: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get candidates by stage
router.get('/stage/:stage', async (req, res) => {
  try {
    const candidates = await Candidate.find({ stage: req.params.stage })
      .sort({ applicationDate: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single candidate
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create candidate
router.post('/', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body is empty' });
    }

    // Ensure required fields are present
    if (!req.body.name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Create new candidate
    const candidate = new Candidate({
      name: req.body.name,
      stage: req.body.stage || 'Applying Period',
      overallScore: req.body.overallScore || 0,
      details: {
        email: req.body.details?.email,
        phone: req.body.details?.phone,
        position: req.body.details?.position,
        experience: req.body.details?.experience || 0,
        skills: req.body.details?.skills || []
      },
      isReferral: req.body.isReferral || false,
      assessmentStatus: req.body.assessmentStatus || 'Pending'
    });

    const newCandidate = await candidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    console.error('Error creating candidate:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        details: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Error creating candidate', error: err.message });
  }
});

// Update candidate
router.put('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete candidate
router.delete('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 