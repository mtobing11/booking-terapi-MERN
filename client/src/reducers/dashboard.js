import { ACTIVE_MENU, RESIZE_SCREEN, INITIAL_SETUP, FETCH_CUSTOMERS, RESET } from '../constants/actionTypes';

export default(state = { activeMenu: true }, action) => {
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
        // case INITIAL_SETUP:
        //     return { ...state, initialSetup: action.payload};
        case RESET:
            return { ...state, existingBookID: null, type: null};
        case FETCH_CUSTOMERS:
            return { ...state, dataCustomers: action.payload};
        default:
            return state;
    }
}