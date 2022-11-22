import * as api from '../api';
import { ACTIVE_MENU, RESIZE_SCREEN, AUTH, LOGOUT, INITIAL_SETUP } from '../constants/actionTypes';

export const handleActiveMenu = (activeMenu) => (dispatch) => {
    dispatch({ type: ACTIVE_MENU, payload: activeMenu })
}

export const handleResizeScreen = (screenSize) => (dispatch) => {
    dispatch({ type: RESIZE_SCREEN, payload: screenSize })
}

export const createBook = (book) => async (dispatch) => {
    // console.log("book in actionTypes", book);
    console.log(book)
    try {
        const { data } = await api.createBook(book);
        console.log(data);
        // dispatch({ type: INITIAL_SETUP, payload: data })
    } catch (error){
        console.log('error di action createBook')
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        console.log(data)
        dispatch({ type: AUTH, data })

        // navigate('/dashboard')
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

export const createInitialSetup = (setUp) => async (dispatch) => {
    try {
        console.log(setUp)
        const data = await api.createInitialSetup(setUp);
        console.log(data)
        // dispatch({ type: INITIAL_SETUP, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateInitialSetup = (id, setUp) => async (dispatch) => {
    try {
        const { data } = await api.updateInitialSetup(id, setUp);
        console.log(data)
        // dispatch({ type: INITIAL_SETUP, payload: data })
    } catch (error) {
        console.log(error)
    }
}