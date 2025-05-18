# Recruitment Pipeline Application

A full-stack recruitment pipeline application built with React and Node.js, featuring automated email notifications, interview scheduling, and candidate tracking.


## Features

- 📋 Kanban-style recruitment pipeline interface
- ✉️ Automated email notifications
- 📅 Automated interview scheduling
- 👥 Candidate management (CRUD operations)
- 🔄 Stage-based filtering
- 📱 Responsive design
- 🔌 RESTful API

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recruitment-pipeline
```

3. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Start application:
```bash
npm start
```

## Tech Stack

### Frontend
- React
- Styled Components
- React DnD (drag and drop)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## API Endpoints

### Candidates
- `GET /api/candidates` - Get all candidates
- `POST /api/candidates` - Create candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate

### Automation
- `GET /api/automation/settings` - Get automation settings
- `PUT /api/automation/settings` - Update automation settings
- `POST /api/automation/email` - Trigger email automation
- `POST /api/automation/schedule` - Schedule interviews
