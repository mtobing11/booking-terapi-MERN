import express from 'express';
import { createAnnouncement, updateAnnouncement, getAnnouncement, createInitialSetup, updateInitialSetup, getInitialSetup, getCustomers } from '../controllers/dashboard.js';

const router = express.Router();

router.get('/announcement/:id', getAnnouncement);
router.post('/announcement', createAnnouncement);
router.patch('/announcement/:id', updateAnnouncement);

router.get('/initialsetup/:id', getInitialSetup);
router.post('/initialsetup', createInitialSetup);
router.patch('/initialsetup/:id', updateInitialSetup);

router.get('/date/:date', getCustomers);

export default router;