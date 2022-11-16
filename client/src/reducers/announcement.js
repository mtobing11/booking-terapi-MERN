import { START_PROCESSING, END_PROCESSING, ACTIVE_MENU, RESIZE_SCREEN, FETCH_ALL_DATES, CREATE_TICKET, CREATE_ANNOUNCEMENT, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT } from '../constants/actionTypes';

export default(state={isProcessing: false, isAnnounce: false, getTicket: []}, action) => {
    switch(action.type) {
        case START_PROCESSING:
            return { ...state, isProcessing: true}
        case END_PROCESSING:
            return { ...state, isProcessing: false}
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        case FETCH_ALL_DATES:
            return { ...state, availableDate: action.payload }
        case CREATE_TICKET:
            return { ...state, isAnnounce: true, announceForm: {}, getTicket: action.payload }
        case CREATE_ANNOUNCEMENT:
            return { ...state, isAnnounce: true, announceForm: action.payload }
        case FETCH_ANNOUNCEMENT:
            return { ...state, isAnnounce: true, announceForm: action.payload }
        case CLOSE_ANNOUNCEMENT:
            return { ...state, isAnnounce: false, announceForm: {}, getTicket: [] }
        default:
            return state;
    }
}