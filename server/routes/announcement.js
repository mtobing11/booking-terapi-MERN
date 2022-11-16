import express from 'express';
import { createAnnouncement, updateAnnouncement, getAnnouncement } from '../controllers/announcement.js';

const router = express.Router();

router.get('/:id', getAnnouncement);
router.post('/', createAnnouncement);
router.patch('/:id', updateAnnouncement);

export default router;