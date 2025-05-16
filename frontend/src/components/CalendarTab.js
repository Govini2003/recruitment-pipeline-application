import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';

const Container = styled.div`
  background: #fff;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  max-width: 700px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  @media (max-width: 600px) {
    padding: 1rem;
    max-width: 98vw;
    margin: 1rem auto;
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;
const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;
const EventItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.7rem 0;
  }
`;
const DateBox = styled.div`
  background: ${props => props.bg || '#e3f0fc'};
  color: #fff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 600px) {
    font-size: 0.97rem;
    padding: 0.4rem 0.7rem;
  }
`;
const Details = styled.div`
  flex: 1;
  @media (max-width: 600px) {
    font-size: 0.97rem;
  }
`;

const eventData = [
  {
    date: 'May 20, 2025',
    color: '#FFB74D', // Orange
    title: 'Frontend SE Interview',
    person: 'John Doe (Software Engineer - Frontend)',
    time: '10:00 AM - 11:00 AM',
  },
  {
    date: 'May 22, 2025',
    color: '#4FC3F7', // Blue
    title: 'Backend SE Intern Interview',
    person: 'Jane Smith (Software Engineer - Backend)',
    time: '2:00 PM - 2:45 PM',
  },
  {
    date: 'May 25, 2025',
    color: '#81C784', // Green
    title: 'QA Engineer Assessment',
    person: 'Michael Lee (QA Engineer)',
    time: '4:00 PM - 4:30 PM',
  },
  {
    date: 'May 27, 2025',
    color: '#9575CD', // Purple
    title: 'Associate SE Interview',
    person: 'Priya Kumar (Associate Software Engineer)',
    time: '11:00 AM - 12:00 PM',
  },
  {
    date: 'May 29, 2025',
    color: '#F8BBD0', // Light Pink
    title: 'Senior SE Technical Round',
    person: 'Alex Brown (Senior Software Engineer)',
    time: '3:00 PM - 4:00 PM',
  },
  {
    date: 'June 1, 2025',
    color:'#FFB74D',
    title: 'Data Analyst Case Study',
    person: 'Sara Lee (Data Analyst)',
    time: '9:00 AM - 10:00 AM',
  },
];

const CalendarTab = () => (
  <Container>
    <Title>Upcoming Interviews & Events</Title>
    <EventList>
      {eventData.map(event => (
        <EventItem key={event.title + event.date}>
          <DateBox bg={event.color}><FaCalendarAlt /> {event.date}</DateBox>
          <Details>
            <div><strong>{event.title}</strong></div>
            <div><FaUser style={{marginRight:4}}/> {event.person}</div>
            <div><FaClock style={{marginRight:4}}/> {event.time}</div>
          </Details>
        </EventItem>
      ))}
    </EventList>
  </Container>
);

export default CalendarTab; 