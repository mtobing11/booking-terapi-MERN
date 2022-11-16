import express from 'express';
import { getDates, createBook, makeAppointment, getAppointment } from '../controllers/books.js';

const router = express.Router();

router.get('/:date', getDates);
router.post('/', createBook);
router.patch('/:dateID', makeAppointment);
router.get('/:dateID/:bookID/shift', getAppointment);

export default router;