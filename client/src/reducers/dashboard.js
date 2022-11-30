import { ACTIVE_MENU, RESIZE_SCREEN, INITIAL_SETUP, FETCH_CUSTOMERS, RESET, FETCH_ALL_DATES_FOR_ADMIN, CREATE_BOOK, UPDATE_DATA ,DELETE } from '../constants/actionTypes';

export default(state = { activeMenu: true, dates: [] }, action) => {
    switch(action.type) {
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        case INITIAL_SETUP:{
            let { data } = action.payload;
            let bookID = null;
            if(action.payload.type === 'editBookDate'){
                console.log("data")
                bookID = data._id
            }
            return { ...state, initialSetup: data, existingBookID: bookID, type: action.payload.type};
        }
        case RESET:
            return { ...state, existingBookID: null, type: null};
        case FETCH_CUSTOMERS:
            return { ...state, dataCustomers: action.payload};
        case FETCH_ALL_DATES_FOR_ADMIN: 
            return { ...state, dates: action.payload }
        case CREATE_BOOK: 
            return { ...state, dates: [...state.dates, action.payload] }
        case UPDATE_DATA: 
            return { ...state, dates: state.dates.map((date) => date._id === action.payload._id ? action.payload : date) }
        case DELETE: 
            return { ...state, dates: state.dates.filter((date) => date._id !== action.payload) }
        default:
            return state;
    }
}