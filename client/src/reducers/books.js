import { START_PROCESSING, END_PROCESSING, FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, FETCH_SHIFTS, DELETE, UPDATE_DATA, CREATE_BOOK } from '../constants/actionTypes';

export default(state = { isProcessing: false, isCreateTicket: false, availableDate: [] }, action) => {
    switch(action.type) {
        case START_PROCESSING:
            return { ...state, isProcessing: true }
        case END_PROCESSING:
            return { ...state, isProcessing: false }
        case FETCH_ALL_DATES:
            return { ...state, availableDate: action.payload }
        case FETCH_SHIFTS:
            return { ...state, shifts: action.payload }
        case CREATE_TICKET:
            return { ...state, isCreateTicket: true, ticketData: action.payload }
        case CLOSE_TICKET:
            return { ...state, isCreateTicket: false, ticketData: {} }
        case CREATE_BOOK: 
            return { ...state, availableDate: [...state.availableDate, action.payload] }
        case UPDATE_DATA: 
            return { ...state, availableDate: state.availableDate.map((date) => date._id === action.payload._id ? action.payload : date) }
        case DELETE:
            return { ...state, availableDate: state.availableDate.filter((date) => date._id !== action.payload) }
        default:
            return state;
    }
}