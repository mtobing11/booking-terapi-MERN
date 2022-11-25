import * as api from '../api';
import { ACTIVE_MENU, RESIZE_SCREEN, AUTH, LOGOUT, INITIAL_SETUP, FETCH_CUSTOMERS } from '../constants/actionTypes';

export const handleActiveMenu = (activeMenu) => (dispatch) => {
    dispatch({ type: ACTIVE_MENU, payload: activeMenu })
}

export const handleResizeScreen = (screenSize) => (dispatch) => {
    dispatch({ type: RESIZE_SCREEN, payload: screenSize })
}

export const createBook = (book) => async (dispatch) => {
    // console.log(book)

    if(book.schedule.length > book.shifts){
      let tempArr = book.schedule;
      tempArr.splice(book.shifts)
      book.schedule = tempArr;
    }

    try {
        const { data } = await api.createBook(book);
        // console.log(data);
        // dispatch({ type: INITIAL_SETUP, payload: data })
    } catch (error){
        console.log('error di action createBook')
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data })

        navigate('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data })
        
        navigate('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

export const getInitialSetup = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchInitialSetup(id);
        dispatch({ type: INITIAL_SETUP, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const createInitialSetup = (setUp) => async (dispatch) => {
    try {
        const data = await api.createInitialSetup(setUp);
        // dispatch({ type: INITIAL_SETUP, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateInitialSetup = (id, setUp) => async (dispatch) => {
    try {
        const { data } = await api.updateInitialSetup(id, setUp);
        dispatch({ type: INITIAL_SETUP, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getCustomers = (date) => async (dispatch) => {
    try {
        const { data } = await api.fetchCustomers(date);
        dispatch({ type: FETCH_CUSTOMERS, payload: data });
    } catch (error) {
        console.log(error)
    }
}