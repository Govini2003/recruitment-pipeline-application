import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
`;

const ContentBox = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Highlight = styled.span`
  color: #2196F3;
  font-weight: 600;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const Feature = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  
  h3 {
    color: #2196F3;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const ApplicationForm = () => {
  return (
    <FormContainer>
      <ContentBox>
        <Title>Launch Your Career Journey</Title>
        <Subtitle>
          Take the first step towards your <Highlight>dream job</Highlight> with us. 
          Join our innovative team and make an impact!
        </Subtitle>
        
        <Features>
          <Feature>
            <h3>Fast Process</h3>
            <p>Quick and easy application process</p>
          </Feature>
          <Feature>
            <h3>Great Benefits</h3>
            <p>Competitive salary and benefits package</p>
          </Feature>
          <Feature>
            <h3>Growth</h3>
            <p>Excellent career growth opportunities</p>
          </Feature>
        </Features>

        <ApplyButton 
          href="https://docs.google.com/forms/u/0/d/e/1FAIpQLSd2YiJfejkCTQ32ILWpox3r07Jw_GmWLJpeN1GYZEdYcAAZxg/formResponse" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Apply Now →
        </ApplyButton>
      </ContentBox>
    </FormContainer>
  );
};

export default ApplicationForm;
