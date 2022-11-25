import { START_PROCESSING, END_PROCESSING, FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, FETCH_SHIFTS } from '../constants/actionTypes';

export default(state = { isProcessing: false, isCreateTicket: false }, action) => {
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
        default:
            return state;
    }
}