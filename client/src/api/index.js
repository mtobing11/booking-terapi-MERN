import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'});
// const API = axios.create({ baseURL: 'https://bookingwebterapitesting.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchDates = (date) => API.get(`/books/${date}`);
export const fetchAllDates = (date) => API.get(`/books/all/${date}`);
export const makeAppointment = (book, dateID) => API.patch(`/books/${dateID}`, book);
export const fetchAppointment = (dateID, bookID, shift) => API.get(`/books/${dateID}/${bookID}/shift?shiftquery=${shift}`);

export const createBook = (newBook) => API.post('/books', newBook);
export const deleteDate = (id) => API.delete(`/books/${id}`);
export const fetchCustomers = (date) => API.get(`/dashboard/date/${date}`);
export const fetchInitialSetup = (id) => API.get(`/dashboard/initialsetup/${id}`);
export const createInitialSetup = (newSetup) => API.post('/dashboard/initialsetup', newSetup);
export const updateInitialSetup = (id, newSetup) => API.patch(`/dashboard/initialsetup/${id}`, newSetup);
export const updateExistingBookDate = (form, dateID) => API.patch(`/dashboard/date/${dateID}`, form);

export const fetchAnnouncement = (id) => API.get(`/dashboard/announcement/${id}`);
export const createAnnouncement = (announcement) => API.post('/dashboard/announcement', announcement);
export const updateAnnouncement = (announcement, id) => API.patch(`/dashboard/announcement/${id}`, announcement);

export const signUp = (formData) => API.post('user/signup', formData);
export const signIn = (formData) => API.post('user/signin', formData);