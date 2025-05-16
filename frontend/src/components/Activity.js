import React from 'react';
import styled from 'styled-components';

const ActivityContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color || '#2196F3'};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const StageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const StageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${props => props.background || '#f8f9fa'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }

  span {
    font-size: 1rem;
    color: #333;
  }

  strong {
    font-size: 1.2rem;
    color: #2196F3;
    min-width: 2rem;
    text-align: right;
    margin-left: 1rem;
  }
`;

const SectionTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  margin: 0;
  padding: 0 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 1.5rem;
    width: 40px;
    height: 3px;
    background: #2196F3;
    border-radius: 2px;
  }
`;

const Activity = ({ candidates = [] }) => {
  // Calculate statistics
  const totalCandidates = candidates.length;
  const activeInterviews = candidates.filter(c => c.stage === 'Interview').length;
  const completedAssessments = candidates.filter(c => c.assessmentStatus === 'Completed').length;
  const averageScore = totalCandidates ? 
    (candidates.reduce((acc, c) => acc + (parseInt(c.overallScore) || 0), 0) / totalCandidates).toFixed(1) : 
    '0.0';

  const stages = {
    'Applying Period': candidates.filter(c => c.stage === 'Applying Period').length,
    'Screening': candidates.filter(c => c.stage === 'Screening').length,
    'Interview': candidates.filter(c => c.stage === 'Interview').length,
    'Test': candidates.filter(c => c.stage === 'Test').length
  };

  const statuses = {
    'Pending': candidates.filter(c => c.assessmentStatus === 'Pending').length,
    'In Progress': candidates.filter(c => c.assessmentStatus === 'In Progress').length,
    'Completed': candidates.filter(c => c.assessmentStatus === 'Completed').length
  };

  return (
    <ActivityContainer>
      <GridContainer>
        <StatCard>
          <StatNumber color="#2196F3">{totalCandidates}</StatNumber>
          <StatLabel>Total Candidates</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color="#4CAF50">{activeInterviews}</StatNumber>
          <StatLabel>Active Interviews</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color="#FF9800">{completedAssessments}</StatNumber>
          <StatLabel>Completed Assessments</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color="#9C27B0">{averageScore}</StatNumber>
          <StatLabel>Average Score</StatLabel>
        </StatCard>
      </GridContainer>

      <GridContainer>
        <StatCard>
          <SectionTitle>Pipeline Stage Distribution</SectionTitle>
          <StageList>
            {Object.entries(stages).map(([stage, count]) => (
              <StageItem key={stage} background={stage === 'Interview' ? '#E3F2FD' : '#f8f9fa'}>
                <span>{stage}</span>
                <strong>{count}</strong>
              </StageItem>
            ))}
          </StageList>
        </StatCard>

        <StatCard>
          <SectionTitle>Assessment Status</SectionTitle>
          <StageList>
            {Object.entries(statuses).map(([status, count]) => (
              <StageItem 
                key={status} 
                background={
                  status === 'Completed' ? '#E8F5E9' :
                  status === 'In Progress' ? '#FFF3E0' :
                  '#f8f9fa'
                }
              >
                <span>{status}</span>
                <strong>{count}</strong>
              </StageItem>
            ))}
          </StageList>
        </StatCard>
      </GridContainer>
    </ActivityContainer>
  );
};

export default Activity;
