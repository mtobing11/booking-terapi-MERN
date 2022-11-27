import * as api from '../api';
import { ACTIVE_MENU, RESIZE_SCREEN, AUTH, LOGOUT, INITIAL_SETUP, FETCH_CUSTOMERS, RESET, DELETE, UPDATE_DATA, CREATE_BOOK } from '../constants/actionTypes';
import { formattingDate } from '../utils/utils';

export const handleActiveMenu = (activeMenu) => (dispatch) => {
    dispatch({ type: ACTIVE_MENU, payload: activeMenu })
}

export const handleResizeScreen = (screenSize) => (dispatch) => {
    dispatch({ type: RESIZE_SCREEN, payload: screenSize })
}

export const createBook = (book) => async (dispatch) => {

    if(book.schedule.length > book.shifts){
      let tempArr = book.schedule;
      tempArr.splice(book.shifts)
      book.schedule = tempArr;
    }

    try {
        const { data } = await api.createBook(book);
        dispatch({ type: CREATE_BOOK, payload: data })
    } catch (error){
        console.log('error di action createBook')
        console.log(error)
    }
}

export const deleteDate = (id) => async (dispatch) => {
    try {
        await api.deleteDate(id);
        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
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
        // dispatch({ type: INITIAL_SETUP, payload: data });
        dispatch({ type: INITIAL_SETUP, payload: { data, type: "initialSetup"} });
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
        // dispatch({ type: INITIAL_SETUP, payload: data })
        dispatch({ type: INITIAL_SETUP, payload: { data, type: "initialSetup"} })
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


// update existing book date, first step
export const editingExistingBookDate = (data) => async (dispatch) => {
    try {
        console.log("Update date book")
        console.log(data)

        let obj = {}
        obj['_id'] = data._id
        obj['bookingdate'] = data.bookingdate
        obj['available'] = data.available
        obj['max'] = data.max
        obj['maxbooking'] = data.maxbooking
        obj['shifts'] = data.shiftInfo.quantity
        obj['schedules'] = []

        console.log(obj)
        for (let i = 0; i < 3; i++){
            if(data.shiftInfo.schedules[i]){
                obj.schedules.push({shiftName: `shift${i+1}`, schedule: data.shiftInfo.schedules[i]})
            } else {
                obj.schedules.push({shiftName: `shift${i+1}`, schedule: ""})
            }
        }
        // console.log(obj)
        dispatch({ type: INITIAL_SETUP, payload: { data: obj, type: "editBookDate"} })
        
    } catch (error) {
        console.log(error)
    }
}

// update existing book date, second step
export const updateExistingBookDate = (form, dateID, isOpen) => async (dispatch) => {
    let tempObj = {...form}
    
    if(isOpen){
        console.log("here1")
        for (let i = 0; i < 3; i++) {
            if( i < tempObj.shifts){
                tempObj[`shift${i+1}Available`] = true;
            } else {
                tempObj[`shift${i+1}Available`] = false;
                tempObj['schedule'].splice(i);
            }
        }
        tempObj['available'] = true
    } else {
        console.log("here2")
    }
    
    try {
        const { data } = await api.updateExistingBookDate(tempObj, dateID);
        dispatch({ type: RESET })
        dispatch({ type: UPDATE_DATA, payload: data })
    } catch (error) {
        console.log(error)
    }
}