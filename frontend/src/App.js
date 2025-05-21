import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CandidateColumn from './components/CandidateColumn';
import CandidateForm from './components/CandidateForm';
import { DragDropContext } from 'react-beautiful-dnd';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import JobInfo from './components/JobInfo';
import CalendarTab from './components/CalendarTab';
import ScoreCard from './components/ScoreCard';
import Activity from './components/Activity';
import ApplicationForm from './components/ApplicationForm';
import Automation from './components/Automation';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  @media (max-width: 900px) {
    height: auto;
  }
`;

const Header = styled.header`
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const HeaderButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  color: white;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    flex: 1;
    font-size: 0.95rem;
  }
`;

const AddButton = styled(HeaderButton)`
  background-color: #4CAF50;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PipelineContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  gap: 1rem;
  overflow-x: auto;
  @media (max-width: 900px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.25rem;
    min-width: unset;
    overflow-x: unset;
    align-items: center;
  }
`;

const stages = [
  { id: 'Applying Period', title: 'Applying Period', color: '#FFB74D' },
  { id: 'Screening', title: 'Screening', color: '#4FC3F7' },
  { id: 'Interview', title: 'Interview', color: '#81C784' },
  { id: 'Test', title: 'Test', color: '#9575CD' }
];

const tabList = [
  { key: 'candidates', label: 'Candidates' },
  { key: 'jobinfo', label: 'Job Info' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'scorecard', label: 'Score Card' },
  { key: 'activity', label: 'Activity' },
  { key: 'applicationform', label: 'Application Form' },
  { key: 'automation', label: 'Automation' },
];

function App() {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0 = Candidates
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/candidates');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleCreateCandidate = async (candidateData) => {
    try {
      const response = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: candidateData.name,
          stage: candidateData.stage || 'Applying Period',
          details: {
            email: candidateData.details?.email || '',
            phone: candidateData.details?.phone || '',
            position: candidateData.details?.position || '',
            experience: candidateData.details?.experience || 0,
            skills: candidateData.details?.skills || []
          },
          isReferral: candidateData.isReferral || false,
          assessmentStatus: candidateData.assessmentStatus || 'Pending',
          overallScore: candidateData.overallScore || 0
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create candidate');
      }

      const newCandidate = await response.json();
      setCandidates(prev => [...prev, newCandidate]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating candidate:', error);
      alert('Failed to create candidate: ' + error.message);
    }
  };

  const handleUpdateCandidate = async (candidateData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${candidateData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });
      const updatedCandidate = await response.json();
      setCandidates(prev =>
        prev.map(c => (c._id === updatedCandidate._id ? updatedCandidate : c))
      );
      setShowForm(false);
      setEditingCandidate(null);
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await fetch(`http://localhost:5000/api/candidates/${candidateId}`, {
          method: 'DELETE',
        });
        setCandidates(prev => prev.filter(c => c._id !== candidateId));
      } catch (error) {
        console.error('Error deleting candidate:', error);
      }
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${draggableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage: destination.droppableId
        }),
      });
      const updatedCandidate = await response.json();
      setCandidates(prev =>
        prev.map(c => (c._id === updatedCandidate._id ? updatedCandidate : c))
      );
    } catch (error) {
      console.error('Error updating candidate stage:', error);
    }
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
    setShowForm(true);
  };

  // Tab navigation handlers
  const handlePrevTab = () => {
    setActiveTab(prev => Math.max(0, prev - 1));
  };

  const handleNextTab = () => {
    setActiveTab(prev => Math.min(tabList.length - 1, prev + 1));
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Filter handlers
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Filter candidates by search term, date range, score range, and valid stage
  const validStages = ['Applying Period', 'Screening', 'Interview', 'Test'];
  const filteredCandidates = candidates.filter(c => {
    // Search filter
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Stage filter
    const matchesStage = validStages.includes(c.stage);
    
    // Date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const applicationDate = new Date(c.applicationDate);
      const now = new Date();
      const daysDiff = Math.floor((now - applicationDate) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case '7days':
          matchesDate = daysDiff <= 7;
          break;
        case '30days':
          matchesDate = daysDiff <= 30;
          break;
        case '90days':
          matchesDate = daysDiff <= 90;
          break;
      }
    }
    
    // Score filter
    let matchesScore = true;
    if (scoreFilter !== 'all') {
      const score = c.overallScore;
      switch (scoreFilter) {
        case '90-100':
          matchesScore = score >= 90 && score <= 100;
          break;
        case '80-89':
          matchesScore = score >= 80 && score < 90;
          break;
        case '70-79':
          matchesScore = score >= 70 && score < 80;
          break;
        case 'below-70':
          matchesScore = score < 70;
          break;
      }
    }
    
    // Status filter
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      matchesStatus = c.assessmentStatus === statusFilter;
    }
    
    return matchesSearch && matchesStage && matchesDate && matchesScore && matchesStatus;
  });

  return (
    <AppContainer>
      <TopBar
        activeTab={activeTab}
        onPrevTab={handlePrevTab}
        onNextTab={handleNextTab}
        tabCount={tabList.length}
      />
      <NavBar
        activeTab={activeTab}
        onTabClick={handleTabClick}
        tabList={tabList}
        searchTerm={searchTerm}
        onSearchChange={e => setSearchTerm(e.target.value)}
        onDateFilterChange={setDateFilter}
        onScoreFilterChange={setScoreFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />
      {activeTab === 0 && (
        <>
          <Header>
            <Title>Recruitment Pipeline</Title>
            <ButtonGroup>
              <AddButton onClick={() => setShowForm(true)}>Add Candidate</AddButton>
            </ButtonGroup>
          </Header>
          <DragDropContext onDragEnd={onDragEnd}>
            <PipelineContainer>
              {stages.map(stage => (
                <CandidateColumn
                  key={stage.id}
                  stage={stage}
                  candidates={filteredCandidates.filter(c => c.stage === stage.id)}
                  onEdit={handleEditCandidate}
                  onDelete={handleDeleteCandidate}
                />
              ))}
            </PipelineContainer>
          </DragDropContext>
          {showForm && (
            <Modal>
              <CandidateForm
                candidate={editingCandidate}
                onSubmit={editingCandidate ? handleUpdateCandidate : handleCreateCandidate}
                onCancel={() => {
                  setShowForm(false);
                  setEditingCandidate(null);
                }}
              />
            </Modal>
          )}
        </>
      )}
      {activeTab === 1 && <JobInfo />}
      {activeTab === 2 && <CalendarTab />}
      {activeTab === 3 && <ScoreCard candidates={candidates} />}
      {activeTab === 4 && <Activity candidates={candidates} />}
      {activeTab === 5 && <ApplicationForm />}
      {activeTab === 6 && <Automation />}
      {activeTab > 6 && (
        <div style={{padding:'2rem',textAlign:'center',color:'#888'}}>This tab is under construction.</div>
      )}
    </AppContainer>
  );
}

export default App;
