import { combineReducers } from 'redux';
import books from './books';
import announcements from './announcement';

export default combineReducers({ books, announcements })