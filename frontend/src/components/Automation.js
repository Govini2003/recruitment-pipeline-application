import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaEnvelope, FaUserCheck, FaCalendarAlt, 
  FaToggleOn, FaToggleOff, FaSpinner, FaCheck, FaTimes 
} from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  background: ${props => props.variant === 'secondary' ? '#f8f9fa' : '#007bff'};
  color: ${props => props.variant === 'secondary' ? '#333' : 'white'};
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'secondary' ? '#e9ecef' : '#0056b3'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  background: ${props => props.success ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.success ? '#2e7d32' : '#c62828'};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;

  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #007bff;
  }

  .label {
    font-size: 0.875rem;
    color: #666;
    margin-top: 0.25rem;
  }
`;

const Automation = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoScreening: false,
    interviewScheduling: true
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState({});

  useEffect(() => {
    fetchSettings();
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh status every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/automation/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/automation/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const toggleSetting = async (setting) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/automation/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setting,
          value: !settings[setting]
        })
      });
      
      if (response.ok) {
        setSettings(prev => ({
          ...prev,
          [setting]: !prev[setting]
        }));
      }
    } catch (error) {
      console.error('Error updating setting:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerAction = async (action) => {
    try {
      setActionStatus(prev => ({ ...prev, [action]: 'loading' }));
      const response = await fetch(`http://localhost:5000/api/automation/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      setActionStatus(prev => ({ 
        ...prev, 
        [action]: data.success ? 'success' : 'error' 
      }));

      // Clear status after 3 seconds
      setTimeout(() => {
        setActionStatus(prev => ({ ...prev, [action]: null }));
      }, 3000);

      // Refresh status
      fetchStatus();
    } catch (error) {
      console.error('Error triggering action:', error);
      setActionStatus(prev => ({ ...prev, [action]: 'error' }));
    }
  };

  const getActionButton = (action, label, icon) => {
    const status = actionStatus[action];
    const Icon = icon;
    
    return (
      <Button 
        onClick={() => triggerAction(action)}
        disabled={status === 'loading' || !settings[action]}
      >
        {status === 'loading' ? (
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <Icon />
        )}
        {label}
        {status === 'success' && <FaCheck style={{ color: '#4caf50' }} />}
        {status === 'error' && <FaTimes style={{ color: '#f44336' }} />}
      </Button>
    );
  };

  return (
    <Container>
      <Title>Recruitment Automation</Title>
      
      <Grid>
        <Card>
          <h3>Automation Settings</h3>
          <SettingRow>
            <SettingLabel>
              <FaEnvelope /> Email Notifications
            </SettingLabel>
            <Button 
              variant="secondary"
              onClick={() => toggleSetting('emailNotifications')}
              disabled={loading}
            >
              {settings.emailNotifications ? <FaToggleOn color="#007bff" /> : <FaToggleOff />}
            </Button>
          </SettingRow>
          <SettingRow>
            <SettingLabel>
              <FaUserCheck /> Auto Screening
            </SettingLabel>
            <Button 
              variant="secondary"
              onClick={() => toggleSetting('autoScreening')}
              disabled={loading}
            >
              {settings.autoScreening ? <FaToggleOn color="#007bff" /> : <FaToggleOff />}
            </Button>
          </SettingRow>
          <SettingRow>
            <SettingLabel>
              <FaCalendarAlt /> Interview Scheduling
            </SettingLabel>
            <Button 
              variant="secondary"
              onClick={() => toggleSetting('interviewScheduling')}
              disabled={loading}
            >
              {settings.interviewScheduling ? <FaToggleOn color="#007bff" /> : <FaToggleOff />}
            </Button>
          </SettingRow>
        </Card>

        <Card>
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {getActionButton('send-emails', 'Send Email Updates', FaEnvelope)}
            {getActionButton('screen-candidates', 'Screen Candidates', FaUserCheck)}
            {getActionButton('schedule-interviews', 'Schedule Interviews', FaCalendarAlt)}
          </div>
          
          {status && (
            <Stats>
              <StatItem>
                <div className="value">{status.emailsSent}</div>
                <div className="label">Emails Sent</div>
              </StatItem>
              <StatItem>
                <div className="value">{status.candidatesScreened}</div>
                <div className="label">Candidates Screened</div>
              </StatItem>
              <StatItem>
                <div className="value">{status.interviewsScheduled}</div>
                <div className="label">Interviews Scheduled</div>
              </StatItem>
              <StatItem>
                <div className="value">
                  {new Date(status.lastUpdated).toLocaleTimeString()}
                </div>
                <div className="label">Last Updated</div>
              </StatItem>
            </Stats>
          )}
        </Card>
      </Grid>
    </Container>
  );
};

export default Automation;
