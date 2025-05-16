# Recruitment Pipeline Application

A full-stack recruitment pipeline application built with React and Node.js.

## Project Structure

```
recruitment-pipeline/
├── frontend/          # React frontend application
└── backend/           # Node.js backend API
```

## Features

- Kanban-style recruitment pipeline interface
- Candidate management (CRUD operations)
- Stage-based filtering
- Responsive design
- RESTful API

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/recruitment-pipeline
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## Tech Stack

### Frontend
- React
- Styled Components
- React DnD (for drag and drop)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## API Endpoints

- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get single candidate
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `GET /api/candidates/stage/:stage` - Get candidates by stage

## Notes

- The application uses MongoDB for data storage
- Frontend is built with React and styled-components
- Backend uses Express.js with MongoDB
- Drag and drop functionality is implemented using React DnD 