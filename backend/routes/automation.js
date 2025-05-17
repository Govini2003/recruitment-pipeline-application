const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate'); // Assuming the Candidate model is in a separate file

// Store automation settings in memory (replace with database in production)
let automationSettings = {
  emailNotifications: true,
  autoScreening: false,
  interviewScheduling: true
};

// Get automation settings
router.get('/settings', (req, res) => {
  res.json(automationSettings);
});

// Update automation settings
router.post('/settings', (req, res) => {
  const { setting, value } = req.body;
  if (setting in automationSettings) {
    automationSettings[setting] = value;
    res.json({ success: true, message: 'Setting updated successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid setting' });
  }
});

// Get automation status
router.get('/status', (req, res) => {
  // Mock status data (replace with real data in production)
  res.json({
    emailsSent: 45,
    candidatesScreened: 28,
    interviewsScheduled: 12,
    lastUpdated: new Date().toISOString()
  });
});

// Trigger email notifications
router.post('/send-emails', (req, res) => {
  if (!automationSettings.emailNotifications) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email notifications are disabled' 
    });
  }
  
  // Mock email sending (replace with real email service in production)
  res.json({ 
    success: true, 
    message: 'Email notifications queued successfully' 
  });
});

// Start candidate screening
router.post('/screen-candidates', (req, res) => {
  if (!automationSettings.autoScreening) {
    return res.status(400).json({ 
      success: false, 
      message: 'Auto screening is disabled' 
    });
  }
  
  // Mock screening process (replace with real screening logic in production)
  res.json({ 
    success: true, 
    message: 'Candidate screening started' 
  });
});

// Schedule interviews
router.post('/schedule-interviews', (req, res) => {
  if (!automationSettings.interviewScheduling) {
    return res.status(400).json({ 
      success: false, 
      message: 'Interview scheduling is disabled' 
    });
  }
  
  // Mock interview scheduling (replace with real calendar integration in production)
  res.json({ 
    success: true, 
    message: 'Interviews scheduled successfully' 
  });
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

// Auto screening endpoint
router.post('/screening', async (req, res) => {
  try {
    const { jobRequirements } = req.body;
    
    // Mock screening process
    const screeningResults = {
      totalCandidates: 15,
      qualified: 8,
      pending: 7,
      message: 'Screening process initiated successfully'
    };
    
    res.json(screeningResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Communication endpoint
router.post('/communication', async (req, res) => {
  try {
    // Mock communication process
    const communicationResults = {
      emailsSent: 12,
      remindersSent: 5,
      failedDeliveries: 0,
      message: 'Communication batch processed successfully'
    };
    
    res.json(communicationResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate reports endpoint
router.post('/reports', async (req, res) => {
  try {
    // Mock report generation
    const reportData = {
      reportId: 'REP' + Date.now(),
      generatedAt: new Date().toISOString(),
      metrics: {
        totalApplications: 45,
        interviewsScheduled: 20,
        offersSent: 8,
        averageTimeToHire: '15 days'
      },
      message: 'Report generated successfully'
    };
    
    res.json(reportData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get automation metrics
router.get('/metrics', async (req, res) => {
  try {
    // Get all candidates
    const candidates = await Candidate.find();
    
    // Calculate metrics
    const metrics = {
      screening: {
        totalScreened: candidates.length,
        qualified: candidates.filter(c => c.overallScore >= 70).length,
        accuracy: candidates.length ? 
          Math.round((candidates.filter(c => c.overallScore >= 70).length / candidates.length) * 100) : 0
      },
      interviews: {
        scheduled: candidates.filter(c => c.stage === 'Interview').length,
        completed: candidates.filter(c => 
          c.stage === 'Interview' && c.assessmentStatus === 'Completed'
        ).length,
        upcoming: candidates.filter(c => 
          c.stage === 'Interview' && c.assessmentStatus === 'Pending'
        ).length
      },
      timeMetrics: {
        avgTimeToHire: calculateAverageTimeToHire(candidates),
        timeSaved: calculateTimeSavedPerWeek(candidates)
      },
      activeProcesses: [
        {
          title: 'Resume Screening',
          detail: `${candidates.filter(c => c.stage === 'Screening').length} candidates in screening`,
          active: true
        },
        {
          title: 'Interview Scheduling',
          detail: `${candidates.filter(c => c.stage === 'Interview' && c.assessmentStatus === 'Pending').length} interviews pending`,
          active: candidates.some(c => c.stage === 'Interview')
        },
        {
          title: 'Performance Analytics',
          detail: `Analyzing ${candidates.length} candidates`,
          active: true
        }
      ]
    };

    res.json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper functions
function calculateAverageTimeToHire(candidates) {
  const hired = candidates.filter(c => c.stage === 'Hired');
  if (!hired.length) return '0d';
  
  const totalDays = hired.reduce((sum, c) => {
    const hireTime = new Date(c.updatedAt) - new Date(c.createdAt);
    return sum + (hireTime / (1000 * 60 * 60 * 24)); // Convert to days
  }, 0);
  
  return Math.round(totalDays / hired.length) + 'd';
}

function calculateTimeSavedPerWeek(candidates) {
  // Estimate time saved based on number of automated processes
  const timePerCandidate = 0.5; // hours
  const automatedCandidates = candidates.filter(c => 
    c.stage === 'Screening' || c.stage === 'Interview'
  ).length;
  
  return (automatedCandidates * timePerCandidate).toFixed(1) + 'h';
}

module.exports = router;
