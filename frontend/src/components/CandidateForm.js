import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 90%;
  margin: 1rem auto;
  position: relative;
  overflow-y: auto;
  max-height: 85vh;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2196F3, #64B5F6);
  }

  @media (max-width: 600px) {
    padding: 1rem;
    width: 95%;
    margin: 0.5rem auto;
    max-height: 90vh;
  }
`;

const Title = styled.h2`
  color: #2196F3;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  
  @media (max-width: 600px) {
    gap: 0.6rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(3px);
  }

  @media (max-width: 600px) {
    gap: 0.3rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s;
  background: #f8f9fa;

  &:focus {
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
    outline: none;
  }

  &:hover {
    border-color: #90CAF9;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const Select = styled(Input).attrs({ as: 'select' })`
  cursor: pointer;
  
  option {
    padding: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(45deg, #2196F3, #64B5F6);
`;

const CancelButton = styled(Button)`
  background: linear-gradient(45deg, #9E9E9E, #BDBDBD);
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`;

const CandidateForm = ({ candidate, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    stage: 'Applying Period',
    overallScore: '0',
    isReferral: false,
    assessmentStatus: 'Pending',
    details: {
      email: '',
      phone: '',
      position: '',
      experience: ''
    }
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        ...candidate,
        overallScore: candidate.overallScore?.toString() || '0',
        details: {
          ...candidate.details,
          experience: candidate.details?.experience?.toString() || '0'
        }
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('details.')) {
      const detailField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [detailField]: type === 'number' ? (value === '' ? '0' : value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? (value === '' ? '0' : value) : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      overallScore: parseInt(formData.overallScore || '0', 10),
      details: {
        ...formData.details,
        experience: parseInt(formData.details.experience || '0', 10)
      }
    };
    onSubmit(submissionData);
  };

  return (
    <FormContainer>
      <Title>{candidate ? 'Edit Candidate' : 'Add New Candidate'}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter candidate name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Stage</Label>
          <Select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
          >
            <option value="Applying Period">Applying Period</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Test">Test</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Overall Score</Label>
          <Input
            type="number"
            name="overallScore"
            value={formData.overallScore}
            onChange={handleChange}
            placeholder="Enter score (0-100)"
            min="0"
            max="100"
          />
        </FormGroup>

        <FormGroup>
          <Label>Assessment Status</Label>
          <Select
            name="assessmentStatus"
            value={formData.assessmentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <Checkbox
              name="isReferral"
              checked={formData.isReferral}
              onChange={handleChange}
            />
            Is Referral
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="details.email"
            value={formData.details.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone</Label>
          <Input
            type="tel"
            name="details.phone"
            value={formData.details.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </FormGroup>

        <FormGroup>
          <Label>Position</Label>
          <Input
            type="text"
            name="details.position"
            value={formData.details.position}
            onChange={handleChange}
            placeholder="Enter position"
          />
        </FormGroup>

        <FormGroup>
          <Label>Experience (years)</Label>
          <Input
            type="number"
            name="details.experience"
            value={formData.details.experience}
            onChange={handleChange}
            placeholder="Enter years of experience"
            min="0"
          />
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit">
            {candidate ? 'Update Candidate' : 'Create Candidate'}
          </SubmitButton>
          {onCancel && (
            <CancelButton type="button" onClick={onCancel}>
              Cancel
            </CancelButton>
          )}
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default CandidateForm;