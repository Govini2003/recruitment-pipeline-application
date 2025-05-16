const express = require('express');
const router = express.Router();

// Get automation settings
router.get('/settings', async (req, res) => {
  try {
    // Mock settings for now - in production, these would come from a database
    const settings = {
      emails: {
        enabled: true,
        templates: {
          applicationReceived: true,
          interviewInvitation: true,
          assessmentReminder: true,
          statusUpdate: true
        }
      },
      notifications: {
        enabled: false,
        types: {
          assessmentCompleted: true,
          statusChanged: true,
          newApplication: true
        }
      },
      scheduling: {
        enabled: true,
        autoSchedule: true,
        reminderHours: 24,
        availabilityWindow: {
          start: '09:00',
          end: '17:00'
        }
      }
    };
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update automation settings
router.put('/settings', async (req, res) => {
  try {
    const { feature, settings } = req.body;
    if (!feature || !settings) {
      return res.status(400).json({ message: 'Feature and settings are required' });
    }
    
    // Mock success response - in production, this would update a database
    res.json({
      message: 'Settings updated successfully',
      feature,
      settings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Trigger email automation
router.post('/email', async (req, res) => {
  try {
    const { candidateId, templateType } = req.body;
    if (!candidateId || !templateType) {
      return res.status(400).json({ message: 'Candidate ID and template type are required' });
    }

    // Mock email sending - in production, this would use a real email service
    res.json({
      message: 'Email queued successfully',
      candidateId,
      templateType
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Schedule interview
router.post('/schedule', async (req, res) => {
  try {
    const { candidateId, interviewDate, interviewType } = req.body;
    if (!candidateId || !interviewDate || !interviewType) {
      return res.status(400).json({ 
        message: 'Candidate ID, interview date, and interview type are required' 
      });
    }

    // Mock interview scheduling - in production, this would integrate with a calendar service
    res.json({
      message: 'Interview scheduled successfully',
      candidateId,
      interviewDate,
      interviewType
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get automation status for a candidate
router.get('/status/:candidateId', async (req, res) => {
  try {
    const { candidateId } = req.params;
    
    // Mock status response - in production, this would come from a database
    res.json({
      candidateId,
      automationStatus: {
        emailsSent: ['applicationReceived', 'interviewInvitation'],
        upcomingInterviews: [
          {
            date: '2025-05-20T10:00:00Z',
            type: 'Technical'
          }
        ],
        pendingActions: ['sendAssessment', 'scheduleFollowup']
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
