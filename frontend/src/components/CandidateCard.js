import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Card = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    padding: 0.7rem;
    font-size: 0.97rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;

  @media (max-width: 600px) {
    font-size: 0.98rem;
  }
`;

const Score = styled.div`
  background-color: ${props => {
    if (props.score >= 80) return '#4CAF50';
    if (props.score >= 60) return '#FFC107';
    return '#F44336';
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 0.18rem 0.4rem;
  }
`;

const Details = styled.div`
  font-size: 0.875rem;
  color: #666;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const Status = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Badge = styled.span`
  background-color: ${props => props.color};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;

  @media (max-width: 600px) {
    gap: 0.3rem;
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
`;

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.7rem;
  }
`;

const EditButton = styled(Button)`
  background-color: #2196F3;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #F44336;
  color: white;
`;

const ShareButton = styled(Button)`
  background-color: #009688;
  color: white;
`;

const ShareMenu = styled.div`
  position: absolute;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  padding: 0.5rem;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
`;

const MenuItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const CandidateCard = ({ candidate, index, onEdit, onDelete }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleShareEmail = () => {
    const subject = `Candidate Profile: ${candidate.name}`;
    const body = `
Name: ${candidate.name}
Stage: ${candidate.stage}
Score: ${candidate.overallScore}%
Application Date: ${new Date(candidate.applicationDate).toLocaleDateString()}
Status: ${candidate.assessmentStatus}
    `;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowShareMenu(false);
  };

  const handleCopyToClipboard = () => {
    const text = `
Candidate Profile:
Name: ${candidate.name}
Stage: ${candidate.stage}
Score: ${candidate.overallScore}%
Application Date: ${new Date(candidate.applicationDate).toLocaleDateString()}
Status: ${candidate.assessmentStatus}
    `;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
    setShowShareMenu(false);
  };

  return (
    <Draggable draggableId={candidate._id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1
          }}
        >
          <CardHeader>
            <Name>{candidate.name}</Name>
            <Score score={candidate.overallScore}>
              {candidate.overallScore}%
            </Score>
          </CardHeader>
          <Details>
            <div>Applied: {new Date(candidate.applicationDate).toLocaleDateString()}</div>
            <Status>
              {candidate.isReferral && (
                <Badge color="#2196F3">Referral</Badge>
              )}
              <Badge color={
                candidate.assessmentStatus === 'Completed' ? '#4CAF50' :
                candidate.assessmentStatus === 'In Progress' ? '#FFC107' :
                '#9E9E9E'
              }>
                {candidate.assessmentStatus}
              </Badge>
            </Status>
            <ActionButtons>
              <EditButton onClick={handleEdit}>Edit</EditButton>
              <ShareButton onClick={handleShare}>Share</ShareButton>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </ActionButtons>
            <ShareMenu show={showShareMenu}>
              <MenuItem onClick={handleShareEmail}>Share via Email</MenuItem>
              <MenuItem onClick={handleCopyToClipboard}>Copy to Clipboard</MenuItem>
            </ShareMenu>
          </Details>
        </Card>
      )}
    </Draggable>
  );
};

export default CandidateCard;