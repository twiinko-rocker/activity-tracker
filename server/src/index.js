import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';


const app = express(); // Create an Express application
app.use(cors(
    {origin: process.env.CLIENT_URL || 'http://localhost:5173'}
));
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// route get test

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});