import express from 'express';
import { createAnnouncement, updateAnnouncement, getAnnouncement, createInitialSetup, updateInitialSetup } from '../controllers/dashboard.js';

const router = express.Router();

router.get('/announcement/:id', getAnnouncement);
router.post('/announcement', createAnnouncement);
router.patch('/announcement/:id', updateAnnouncement);

router.post('/initialsetup', createInitialSetup);
router.patch('/initialsetup/:id', updateInitialSetup);

export default router;