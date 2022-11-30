import * as api from '../api';
import { FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT, FETCH_SHIFTS, FRESH_TRUE, FRESH_FALSE} from '../constants/actionTypes';
import { formattingDate, sortDateArr } from '../utils/utils';

// get available dates
export const getAvailableDates = (date) => async (dispatch) =>{
    dispatch({ type: FRESH_FALSE})
    try {
        const { data } = await api.fetchDates(date);
        if(data.length < 1){
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Maaf, saat ini semua tanggal sudah penuh", type: "err_data"} })
        }
        let newArr = sortDateArr(data)
        dispatch({ type: FETCH_ALL_DATES, payload: newArr });
        dispatch({ type: FETCH_SHIFTS, payload: data[0].shiftInfo.schedules });
    } catch (error) {
        console.log(error);
    }
}

export const makeAppointment = (book, dateID) => async (dispatch) => {
    try {
        dispatch({ 
            type: FETCH_ANNOUNCEMENT, 
            payload: { message: "Harap menunggu, sedang di-cek apakah masih ada tempat atau tidak", type:"info", isShowProgress: true}
        })
        
        if(book.name == "" || book.datebook == "" || book.sessionbook == ""){
            dispatch({ type: CLOSE_ANNOUNCEMENT})
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Ada data yang belum diinput, harap input ulang", type: "err_data"} })
        }

        if(!book.cellphone){
            dispatch({ type: CLOSE_ANNOUNCEMENT})
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "No HP salah, harap input no HP lagi", type: "err_data"} })
        }
        if(!dateID){
            dispatch({ type: CLOSE_ANNOUNCEMENT})
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Tanggal tsb booking sedang ditutup", type: "err_data"} })
        }

        const { data } = await api.makeAppointment(book, dateID);
        const shift = book.sessionbook;

        if(data.type === 'err_data'){
            await dispatch({ type: CLOSE_ANNOUNCEMENT})
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: data})
        }


        const dataBooked = await api.fetchAppointment(dateID, data, shift)

        const formattedDate = formattingDate(new Date(dataBooked.data.bookingdate), 'dmmy')
        const formattedTimestamp = formattingDate(new Date(dataBooked.data.timestamp), 'dmmmy')
        const newDataChangeDateFormat = { ...dataBooked.data, bookingdate: formattedDate, timestamp: formattedTimestamp}
        
        await dispatch({ type: CLOSE_ANNOUNCEMENT})
        
        if(dataBooked){
            dispatch({ type: CREATE_TICKET, payload: newDataChangeDateFormat })
        } else {
            dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Mohon maaf, sudah fullbook", type: "err_data"} })
        }
    } catch (error) {
        console.log(error)
    }
}

export const closeTicket = () => async (dispatch) => {
    try {
        dispatch({ type: CLOSE_TICKET })
    } catch (error) {
        console.log(error)
    }
}

export const refreshPage = () => (dispatch) => {
    dispatch({ type: FRESH_TRUE})
}