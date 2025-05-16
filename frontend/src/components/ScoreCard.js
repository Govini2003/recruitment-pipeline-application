import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScoreCardContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const ScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background-color: #f5f5f5;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Score = styled.span`
  font-weight: ${props => props.isTop ? 'bold' : 'normal'};
  color: ${props => props.color};
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => props.isTop ? '#e8f5e9' : 'transparent'};
`;

const TopPerformers = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TopPerformerTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  text-align: center;
`;

const TopPerformerCard = styled.div`
  background: ${props => {
    switch(props.rank) {
      case 0: return 'linear-gradient(135deg, #4FC3F7 0%, #E1F5FE 100%)'; // Screening blue
      case 1: return 'linear-gradient(135deg, #81C784 0%, #E8F5E9 100%)'; // Interview green
      case 2: return 'linear-gradient(135deg, #9575CD 0%, #EDE7F6 100%)'; // Test purple
      default: return 'white';
    }
  }};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: ${props => props.rank === 0 
    ? '0 4px 20px rgba(79, 195, 247, 0.2)'
    : '0 4px 6px rgba(0,0,0,0.1)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const RankBadge = styled.div`
  background: ${props => {
    switch(props.rank) {
      case 0: return '#4FC3F7'; // Screening blue
      case 1: return '#81C784'; // Interview green
      case 2: return '#9575CD'; // Test purple
      default: return '#ddd';
    }
  }};
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 12px;
`;

const CandidateInfo = styled.div`
  flex: 1;
`;

const CandidateName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #2c3e50;
`;

const CandidateDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

function ScoreCard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
    const interval = setInterval(fetchCandidates, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/candidates');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Sort candidates by overallScore in descending order
      // Handle undefined/null scores as 0
      const sortedCandidates = [...data].sort((a, b) => {
        const scoreA = parseInt(a.overallScore) || 0;
        const scoreB = parseInt(b.overallScore) || 0;
        return scoreB - scoreA;
      });

      setCandidates(sortedCandidates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    const numScore = parseInt(score) || 0;
    if (numScore >= 80) return '#2e7d32'; // Green
    if (numScore >= 60) return '#f57c00'; // Orange
    if (numScore > 0) return '#c62828';   // Red
    return '#757575';                      // Gray
  };

  // Get top performers (score > 0)
  const topPerformers = candidates
    .filter(c => parseInt(c.overallScore) > 0)
    .slice(0, 3);

  if (loading) {
    return <div>Loading scores...</div>;
  }

  return (
    <ScoreCardContainer>
      <Title>Candidate Score Card</Title>
      
      <TopPerformers>
        <TopPerformerTitle>🏆 Top Performers</TopPerformerTitle>
        {topPerformers.map((candidate, index) => (
          <TopPerformerCard key={candidate._id} rank={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RankBadge rank={index}>{index + 1}</RankBadge>
              <CandidateInfo>
                <CandidateName>{candidate.name}</CandidateName>
                <CandidateDetails>
                  {candidate.details?.position || '-'} 
                  {candidate.details?.experience > 0 && ` • ${candidate.details?.experience} years exp.`}
                  {' • '}{candidate.stage}
                </CandidateDetails>
              </CandidateInfo>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Score isTop={true} color={getScoreColor(candidate.overallScore)}>
                Score: {candidate.overallScore}
              </Score>
            </div>
          </TopPerformerCard>
        ))}
        {topPerformers.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
            No scored candidates yet
          </div>
        )}
      </TopPerformers>

      <ScoreTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Position</Th>
            <Th>Stage</Th>
            <Th>Score</Th>
            <Th>Experience</Th>
            <Th>Assessment Status</Th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate._id}>
              <Td>{candidate.name}</Td>
              <Td>{candidate.details?.position || '-'}</Td>
              <Td>{candidate.stage}</Td>
              <Td>
                <Score color={getScoreColor(candidate.overallScore)}>
                  {candidate.overallScore || 0}
                </Score>
              </Td>
              <Td>{candidate.details?.experience || 0} years</Td>
              <Td>
                <span style={{ 
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  backgroundColor: candidate.assessmentStatus === 'Completed' ? '#e8f5e9' 
                    : candidate.assessmentStatus === 'In Progress' ? '#fff3e0' 
                    : '#f5f5f5',
                  color: candidate.assessmentStatus === 'Completed' ? '#2e7d32'
                    : candidate.assessmentStatus === 'In Progress' ? '#ef6c00'
                    : '#757575'
                }}>
                  {candidate.assessmentStatus}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </ScoreTable>
    </ScoreCardContainer>
  );
}

export default ScoreCard;
