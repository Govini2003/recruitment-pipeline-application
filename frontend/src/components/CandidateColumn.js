import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 0;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    min-width: 220px;
  }
  @media (max-width: 600px) {
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
  }
`;

const ColumnHeader = styled.div`
  padding: 1rem;
  background-color: ${props => props.color};
  color: white;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.75rem;
  }
`;

const CandidateCount = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const CandidateList = styled.div`
  padding: 1rem;
  flex: 1 1 auto;
  min-height: 100px;
  max-height: 70vh;
  overflow-y: auto;
  background-color: ${props => props.isDraggingOver ? '#f0f0f0' : 'transparent'};
  transition: background-color 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 600px) {
    padding: 0.5rem;
    max-height: 60vh;
  }
`;

const CandidateColumn = ({ stage, candidates, onEdit, onDelete }) => {
  return (
    <ColumnContainer>
      <ColumnHeader color={stage.color}>
        {stage.title}
        <CandidateCount>{candidates.length}</CandidateCount>
      </ColumnHeader>
      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <CandidateList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {candidates.map((candidate, index) => (
              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                index={index}
                onEdit={() => onEdit(candidate)}
                onDelete={() => onDelete(candidate._id)}
              />
            ))}
            {provided.placeholder}
          </CandidateList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default CandidateColumn; 