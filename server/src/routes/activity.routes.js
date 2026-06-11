import { verifyToken } from '../middleware/auth.middleware.js';
import { createActivity, getActivities, deleteActivity } from '../controllers/activity.controller.js';
import express from 'express';

const router = express.Router(); // Create a router for activity-related routes

router.post('/', verifyToken, createActivity);
router.delete('/:id', verifyToken, deleteActivity);
router.get('/', verifyToken, getActivities);

export default router;