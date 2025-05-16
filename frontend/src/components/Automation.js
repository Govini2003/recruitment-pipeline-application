import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaBell, FaCalendarCheck, FaCog, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const AutomationContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const AutomationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const AutomationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #2196F3;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0;
`;

const CardContent = styled.div`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isActive ? '#2196F3' : '#999'};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1rem;
  }
`;

const SettingsButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
    color: #333;
  }
`;

const StatusMessage = styled.div`
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 4px;
  text-align: center;
  background-color: ${props => props.success ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.success ? '#2e7d32' : '#c62828'};
`;

const AutomationFeature = ({ icon: Icon, title, description, isActive, onToggle, onConfigure }) => (
  <AutomationCard>
    <CardHeader>
      <Icon />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{description}</CardContent>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ToggleButton onClick={onToggle} isActive={isActive}>
        {isActive ? <FaToggleOn /> : <FaToggleOff />}
        <span>{isActive ? 'Enabled' : 'Disabled'}</span>
      </ToggleButton>
      <SettingsButton onClick={onConfigure}>
        <FaCog />
        Configure
      </SettingsButton>
    </div>
  </AutomationCard>
);

const Automation = () => {
  const [automationStates, setAutomationStates] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    fetchAutomationSettings();
  }, []);

  const fetchAutomationSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/automation/settings');
      const data = await response.json();
      setAutomationStates({
        emails: data.emails.enabled,
        notifications: data.notifications.enabled,
        scheduling: data.scheduling.enabled
      });
    } catch (error) {
      console.error('Error fetching automation settings:', error);
      setStatusMessage({
        text: 'Failed to load automation settings',
        success: false
      });
    }
  };

  const toggleAutomation = async (feature) => {
    try {
      const response = await fetch('http://localhost:5000/api/automation/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          feature,
          settings: { enabled: !automationStates[feature] }
        })
      });

      if (!response.ok) throw new Error('Failed to update settings');

      setAutomationStates(prev => ({
        ...prev,
        [feature]: !prev[feature]
      }));

      setStatusMessage({
        text: `${feature} automation ${!automationStates[feature] ? 'enabled' : 'disabled'} successfully`,
        success: true
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Error updating automation settings:', error);
      setStatusMessage({
        text: `Failed to update ${feature} automation`,
        success: false
      });
    }
  };

  const handleConfigure = (feature) => {
    // This would open a configuration modal in a full implementation
    alert(`Configure ${feature} settings - Coming soon!`);
  };

  const features = [
    {
      icon: FaEnvelope,
      title: 'Email Automation',
      description: 'Automatically send personalized emails to candidates at different stages of the recruitment process.',
      feature: 'emails'
    },
    {
      icon: FaBell,
      title: 'Status Notifications',
      description: 'Get notified when candidates complete assessments or when their status changes.',
      feature: 'notifications'
    },
    {
      icon: FaCalendarCheck,
      title: 'Interview Scheduling',
      description: 'Automatically schedule and send interview invitations based on availability.',
      feature: 'scheduling'
    }
  ];

  return (
    <AutomationContainer>
      <Title>Recruitment Automation</Title>
      <AutomationGrid>
        {features.map((feature) => (
          <AutomationFeature
            key={feature.feature}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            isActive={automationStates[feature.feature]}
            onToggle={() => toggleAutomation(feature.feature)}
            onConfigure={() => handleConfigure(feature.title)}
          />
        ))}
      </AutomationGrid>
      {statusMessage && (
        <StatusMessage success={statusMessage.success}>
          {statusMessage.text}
        </StatusMessage>
      )}
    </AutomationContainer>
  );
};

export default Automation;
