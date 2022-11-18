import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'})

export const fetchDates = (date) => API.get(`/books/${date}`);
export const makeAppointment = (book, dateID) => API.patch(`/books/${dateID}`, book);
export const fetchAppointment = (dateID, bookID, shift) => API.get(`/books/${dateID}/${bookID}/shift?shiftquery=${shift}`);

export const createBook = (newBook) => API.post('/books', newBook);

export const fetchAnnouncement = (id) => API.get(`/announcement/${id}`);
export const createAnnouncement = (announcement) => API.post('/announcement', announcement);
export const updateAnnouncement = (announcement, id) => API.patch(`/announcement/${id}`, announcement);