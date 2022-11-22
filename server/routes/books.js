import express from 'express';
import { getDates, createBook, makeAppointment, getAppointment } from '../controllers/books.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:date', getDates);
router.patch('/:dateID', makeAppointment);
router.get('/:dateID/:bookID/shift', getAppointment);

router.post('/', auth, createBook);

export default router;