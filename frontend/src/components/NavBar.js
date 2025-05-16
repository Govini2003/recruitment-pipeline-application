import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUserFriends, FaCalendarAlt, FaClipboardList, FaChartLine, FaFileAlt, FaCog } from 'react-icons/fa';

const NavBarContainer = styled.div`
  background: #f7f8fa;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 2rem;
  @media (max-width: 600px) {
    padding: 0 0.5rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 0.5rem;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    gap: 0.5rem;
    padding-top: 0.25rem;
    font-size: 0.95rem;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid ${props => (props.active ? '#222' : 'transparent')};
  color: ${props => (props.active ? '#222' : '#6b7280')};
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.4rem 0;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0 0.5rem 0;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 0.5rem 0 0.25rem 0;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.4rem 0.7rem;
    width: 100%;
    min-width: 120px;
  }
`;

const FilterBtn = styled.button`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #222;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RightFilters = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 200px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 0.5rem;
  margin-top: 0.25rem;
`;

const FilterOption = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const getTabIcon = (key) => {
  switch (key) {
    case 'candidates':
      return <FaUserFriends size={16} />;
    case 'jobinfo':
      return <FaClipboardList size={16} />;
    case 'calendar':
      return <FaCalendarAlt size={16} />;
    case 'scorecard':
      return <FaChartLine size={16} />;
    case 'activity':
      return <FaChartLine size={16} />;
    case 'applicationform':
      return <FaFileAlt size={16} />;
    case 'automation':
      return <FaCog size={16} />;
    default:
      return null;
  }
};

const NavBar = ({ 
  activeTab = 0, 
  onTabClick, 
  tabList, 
  searchTerm, 
  onSearchChange,
  onDateFilterChange,
  onScoreFilterChange,
  onStatusFilterChange 
}) => {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showScoreDropdown, setShowScoreDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const dateRanges = [
    { label: 'All Time', value: 'all' },
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last 30 Days', value: '30days' },
    { label: 'Last 90 Days', value: '90days' }
  ];

  const scoreRanges = [
    { label: 'All Scores', value: 'all' },
    { label: '90-100%', value: '90-100' },
    { label: '80-89%', value: '80-89' },
    { label: '70-79%', value: '70-79' },
    { label: 'Below 70%', value: 'below-70' }
  ];

  const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-dropdown')) {
        setShowDateDropdown(false);
        setShowScoreDropdown(false);
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <NavBarContainer>
      <Tabs>
        {tabList.map((tab, idx) => (
          <Tab key={tab.key} active={activeTab === idx} onClick={() => onTabClick(idx)}>
            {getTabIcon(tab.key)}
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      {activeTab === 0 && (
        <FiltersRow>
          <SearchInput 
            placeholder="Search" 
            value={searchTerm} 
            onChange={onSearchChange} 
          />
          <FilterDropdown className="filter-dropdown">
            <FilterBtn onClick={() => setShowDateDropdown(!showDateDropdown)}>
              Date Range
            </FilterBtn>
            <DropdownContent show={showDateDropdown}>
              {dateRanges.map(range => (
                <FilterOption 
                  key={range.value}
                  onClick={() => {
                    onDateFilterChange(range.value);
                    setShowDateDropdown(false);
                  }}
                >
                  {range.label}
                </FilterOption>
              ))}
            </DropdownContent>
          </FilterDropdown>
          <FilterDropdown className="filter-dropdown">
            <FilterBtn onClick={() => setShowScoreDropdown(!showScoreDropdown)}>
              Score Range
            </FilterBtn>
            <DropdownContent show={showScoreDropdown}>
              {scoreRanges.map(range => (
                <FilterOption 
                  key={range.value}
                  onClick={() => {
                    onScoreFilterChange(range.value);
                    setShowScoreDropdown(false);
                  }}
                >
                  {range.label}
                </FilterOption>
              ))}
            </DropdownContent>
          </FilterDropdown>
          <FilterDropdown className="filter-dropdown">
            <FilterBtn onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
              Assessment Status
            </FilterBtn>
            <DropdownContent show={showStatusDropdown}>
              {statusOptions.map(status => (
                <FilterOption 
                  key={status.value}
                  onClick={() => {
                    onStatusFilterChange(status.value);
                    setShowStatusDropdown(false);
                  }}
                >
                  {status.label}
                </FilterOption>
              ))}
            </DropdownContent>
          </FilterDropdown>
        </FiltersRow>
      )}
    </NavBarContainer>
  );
};

export default NavBar;