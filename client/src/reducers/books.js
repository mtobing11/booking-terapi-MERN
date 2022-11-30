import { START_PROCESSING, END_PROCESSING, FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, FETCH_SHIFTS, DELETE, UPDATE_DATA, CREATE_BOOK, FRESH_TRUE, FRESH_FALSE } from '../constants/actionTypes';

export default(state = { isProcessing: false, isCreateTicket: false, availableDate: [], needRefresh: false }, action) => {
    switch(action.type) {
        case START_PROCESSING:
            return { ...state, isProcessing: true }
        case END_PROCESSING:
            return { ...state, isProcessing: false }
        case FETCH_ALL_DATES: 
            return { ...state, availableDate: action.payload }
        case FETCH_SHIFTS:
            return { ...state, shifts: action.payload }
        case FRESH_TRUE:{
            // console.log("Refresh true reducer")
            return { ...state, needRefresh: true }
        }
        case FRESH_FALSE: {
            // console.log("Refresh false reducer")
            return { ...state, needRefresh: false }
        }
        case CREATE_TICKET: 
            return { ...state, isCreateTicket: true, ticketData: action.payload }
        case CLOSE_TICKET:
            return { ...state, isCreateTicket: false, ticketData: {}, needFresh: true }
        default:
            return state;
    }
}