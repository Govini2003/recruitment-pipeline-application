import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaUserTie, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  @media (max-width: 600px) {
    padding: 1rem 0.5rem 0.5rem 0.5rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const JobTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #222;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 1rem;
  flex-wrap: wrap;
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavBtn = styled.button`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  color: #6b7280;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background: #f3f4f6;
  }
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  margin-right: 0.5rem;
  background: ${props => props.bg || '#eee'};
  color: ${props => props.color || '#222'};
  white-space: nowrap;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const TopBar = ({ activeTab = 0, onPrevTab, onNextTab, tabCount }) => {
  return (
    <TopBarContainer>
      <TopRow>
        <TitleSection>
          <JobTitle>Research and Development Officer</JobTitle>
          <Meta>
            <Pill bg="#d1fae5" color="#047857">
              <IconWrapper color="#047857">
                <FaCheckCircle size={14} />
              </IconWrapper>
              Open
            </Pill>
            <Pill bg="#e3f0fc" color="#2563eb">
              <IconWrapper color="#2563eb">
                <FaUserTie size={14} />
              </IconWrapper>
              Researcher
            </Pill>
            <Pill bg="#f3f4f6" color="#6b7280">
              <IconWrapper color="#6b7280">
                <FaMapMarkerAlt size={14} />
              </IconWrapper>
              Onsite
            </Pill>
          </Meta>
        </TitleSection>
        <NavButtons>
          <NavBtn onClick={onPrevTab} disabled={activeTab === 0}>
            <FaChevronLeft size={14} />
          </NavBtn>
          <NavBtn onClick={onNextTab} disabled={activeTab === tabCount - 1}>
            <FaChevronRight size={14} />
          </NavBtn>
          <span style={{ color: '#6b7280', fontSize: '1rem', margin: '0 0.5rem' }}>
            {activeTab + 1} of {tabCount}
          </span>
        </NavButtons>
      </TopRow>
    </TopBarContainer>
  );
};

export default TopBar;