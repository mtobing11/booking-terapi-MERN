import { combineReducers } from 'redux';
import books from './books';
import announcements from './announcement';
import dashboard from './dashboard';
import auth from './auth';

export default combineReducers({ books, announcements, dashboard, auth })