import * as api from '../api';
import { FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT, FETCH_SHIFTS } from '../constants/actionTypes';
import { formattingDate } from '../utils/utils'

// actions
export const getAvailableDates = (date) => async (dispatch) =>{
    try {
        const { data } = await api.fetchDates(date);
        
        if(data.length < 1){
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Maaf, saat ini semua tanggal sudah penuh", type: "err_data"} })
        }
        
        dispatch({ type: FETCH_ALL_DATES, payload: data });
        dispatch({ type: FETCH_SHIFTS, payload: data[0].shiftInfo.schedules });
    } catch (error) {
        if(error.response?.status === 404) {
            console.log(error.response.data)
        } else {
            console.log(error)
        }
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

        const { data } = await api.makeAppointment(book, dateID);
        const shift = book.sessionbook;

        if(data.type === 'err_data'){
            await dispatch({ type: CLOSE_ANNOUNCEMENT})
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: data})
        }


        const dataBooked = await api.fetchAppointment(dateID, data, shift)

        console.log("already get the fetch appoinmnet")
        console.log(dataBooked.data)

        const formattedDate = formattingDate(new Date(dataBooked.data.bookingdate), 'dmmy')
        const formattedTimestamp = formattingDate(new Date(dataBooked.data.timestamp), 'dmmmy')
        // const formattedDate = formatDate(new Date(dataBooked.data.bookingdate), 'dmmy')
        // const formattedTimestamp = formatDate(new Date(dataBooked.data.timestamp), 'dmmmy')
        const newDataChangeDateFormat = { ...dataBooked.data, bookingdate: formattedDate, timestamp: formattedTimestamp}
        
        await dispatch({ type: CLOSE_ANNOUNCEMENT})
        
        if(dataBooked){
            dispatch({ type: CREATE_TICKET, payload: newDataChangeDateFormat })
        } else {
            dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Mohon maaf, sudah fullbook", type: "err_data"} })
        }
    } catch (error) {
        if(error.response.status === 404) {
            console.log(error.response.data)
        } else {
            console.log(error)
        }
    }
}

export const closeTicket = () => async (dispatch) => {
    try {
        dispatch({ type: CLOSE_TICKET })
    } catch (error) {
        console.log(error)
    }
}