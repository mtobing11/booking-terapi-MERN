import { START_PROCESSING, END_PROCESSING, ACTIVE_MENU, RESIZE_SCREEN, FETCH_ALL_DATES, CREATE_TICKET, CLOSE_TICKET, CREATE_ANNOUNCEMENT, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT } from '../constants/actionTypes';

export default(state = { isProcessing: false, isCreateTicket: false }, action) => {
    switch(action.type) {
        case START_PROCESSING:
            return { ...state, isProcessing: true }
        case END_PROCESSING:
            return { ...state, isProcessing: false }
        case FETCH_ALL_DATES:
            return { ...state, availableDate: action.payload }
        case CREATE_TICKET:
            return { ...state, isCreateTicket: true, ticketData: action.payload }
        case CLOSE_TICKET:
            return { ...state, isCreateTicket: false, ticketData: {} }
        default:
            return state;
    }
}