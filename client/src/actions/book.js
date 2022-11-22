import * as api from '../api';
import { FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT } from '../constants/actionTypes';

// functions
function addZeroToDate(num){
    if (num <=9){
        return "0" + num;
    }
    return num
}

function formatDate(date, arrFormat){
    let day = addZeroToDate(date.getDate()),
        month = addZeroToDate(date.getMonth() + 1),
        year = date.getFullYear(), 
        dayIndex = date.getDay(),
        hour = addZeroToDate(date.getHours()),
        minute = addZeroToDate(date.getMinutes()),
        second = addZeroToDate(date.getSeconds()),
        millisecond = date.getMilliseconds();

    let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agst', 'Sep', 'Okt', 'Nov', 'Des'];
    let dayNameInIndonesia = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    if (arrFormat == "ymd"){
        return [year, month, day].join('-');
    } else if (arrFormat == "ymd-time"){
        let formatDate = [year, month, day].join("-");
        let formatTime = [hour, minute, second].join(":");
        return [formatDate, formatTime, dayNameInIndonesia[dayIndex]].join(' ');
    } else if (arrFormat == "dmmy"){
        return [day, monthName[month-1], year].join(' ');
    }

    let formatDate = [day, month, year].join("-");
    let formatTime = [hour, minute, second].join(":");

    return [formatDate, formatTime, dayNameInIndonesia[dayIndex]].join(' ');
}


// actions
export const getAvailableDates = (date) => async (dispatch) =>{
    try {
        const { data } = await api.fetchDates(date);
        
        if(data.length < 1){
            return dispatch({ type: FETCH_ANNOUNCEMENT, payload: { message: "Maaf, saat ini semua tanggal sudah penuh", type: "err_data"} })
        }
        
        dispatch({ type: FETCH_ALL_DATES, payload: data })   
    } catch (error) {
        if(error.response?.status === 404) {
            console.log(error.response.data)
        } else {
            console.log(error)
        }
    }
}

export const makeAppointment = (book, dateID) => async (dispatch) => {
    console.log("check phone format:", book.cellphone)

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

        const formattedDate = formatDate(new Date(dataBooked.data.bookingdate), 'dmmy')
        const formattedTimestamp = formatDate(new Date(dataBooked.data.timestamp), 'dmmmy')
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