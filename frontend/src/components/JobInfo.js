import React from 'react';
import styled from 'styled-components';

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
const Section = styled.div`
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    margin-bottom: 1rem;
    font-size: 0.97rem;
  }
`;
const JobsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const JobCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;
const JobHeader = styled.div`
  background: ${props => props.bg || '#eee'};
  color: #fff;
  padding: 1rem;
  font-size: 1.15rem;
  font-weight: 700;
`;
const JobContent = styled.div`
  padding: 1rem;
  color: #333;
`;
const SubList = styled.ul`
  margin: 0.2rem 0 0 1.5rem;
  padding: 0;
  list-style: circle inside;
  font-size: 0.97rem;
`;
const Desc = styled.div`
  font-size: 0.97rem;
`;

const jobData = [
  {
    title: 'Software Engineer',
    bg: '#FFB74D', // Orange
    subs: ['Frontend', 'Backend', 'Fullstack'],
    desc: 'Build and maintain scalable software applications as part of our core engineering team.'
  },
  {
    title: 'Software Engineer Intern',
    bg: '#4FC3F7', // Blue
    subs: ['Frontend', 'Backend', 'Fullstack'],
    desc: 'Gain hands-on experience in software development and work with experienced mentors.'
  },
  {
    title: 'QA Engineer',
    bg: '#81C784', // Green
    desc: 'Ensure the quality and reliability of our products through testing and automation.'
  },
  {
    title: 'Associate Software Engineer',
    bg: '#9575CD', // Purple
    desc: 'Kickstart your engineering career by contributing to real-world projects and learning best practices.'
  },
  {
    title: 'Senior Software Engineer',
    bg: '#F8BBD0', // Light Pink
    desc: 'Lead technical initiatives, mentor junior engineers, and drive architectural decisions.'
  },
  {
    title: 'Data Analyst',
    bg: '#FFB74D',
    desc: 'Analyze data, generate insights, and support data-driven decision making across the company.'
  },
];

const JobInfo = () => (
  <Container>
    <Title>Job Information</Title>
    <Section>
      <strong>Company:</strong> Zelora
    </Section>
    <Section>
      <strong>Address:</strong> RV4F+7X2, Moratuwa
    </Section>
    <Section>
      <strong>Hours:</strong> Open &middot; Closes 5:30 PM
    </Section>
    <Section>
      <JobsGrid>
        {jobData.map(job => (
          <JobCard key={job.title}>
            <JobHeader bg={job.bg}>{job.title}</JobHeader>
            <JobContent>
              {job.subs && (
                <SubList>
                  {job.subs.map(sub => <li key={sub}>{sub}</li>)}
                </SubList>
              )}
              <Desc>{job.desc}</Desc>
            </JobContent>
          </JobCard>
        ))}
      </JobsGrid>
    </Section>
    <Section>
      <strong>About the Company:</strong>
      <p>
        Zelora is a leading technology company focused on delivering innovative software solutions. We value creativity, collaboration, and continuous learning.
      </p>
    </Section>
    <Section>
      <strong>Key Responsibilities (example for SE roles):</strong>
      <ul>
        <li>Design, develop, and maintain scalable software applications</li>
        <li>Collaborate with cross-functional teams</li>
        <li>Participate in code reviews and agile ceremonies</li>
        <li>Write clean, efficient, and well-documented code</li>
      </ul>
    </Section>
    <Section>
      <strong>Requirements (example for SE roles):</strong>
      <ul>
        <li>Bachelor's degree in Computer Science or related field</li>
        <li>Experience with modern web technologies (React, Node.js, etc.)</li>
        <li>Strong problem-solving and communication skills</li>
        <li>Passion for technology and learning</li>
      </ul>
    </Section>
  </Container>
);

export default JobInfo;