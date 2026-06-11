import { verifyToken } from '../middleware/auth.middleware.js';
import { createActivity, getActivities } from '../controllers/activity.controller.js';
import express from 'express';

const router = express.Router(); // Create a router for activity-related routes

router.post('/', verifyToken, createActivity);
router.get('/', verifyToken, getActivities);

export default router;