# Activity Tracker

Activity Tracker is a full-stack web application that allows users to create an accocunt, log in and have a dasboard, where they can log and monitor physical activities, delete them if necessary, and logout securely.

## Live Demo
- Frontend: https://activity-tracker-brown-eight.vercel.app
- Backend: https://activity-tracker-api-59a8.onrender.com

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Auth: JWT + bcryptjs

## Features
- User registration and login
- Log activities with dynamic fields
- View activity history
- Delete activities
- Logout
- Protected routes

## Run Locally

### Backend
cd server
npm install
npm run dev

### Frontend
cd client
npm install
npm run dev

## Environment Variables

### Server (.env)
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

### Client (.env)
VITE_API_URL=http://localhost:3000