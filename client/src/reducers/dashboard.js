import { ACTIVE_MENU, RESIZE_SCREEN, INITIAL_SETUP, FETCH_CUSTOMERS } from '../constants/actionTypes';

export default(state = { activeMenu: true }, action) => {
    switch(action.type) {
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        case INITIAL_SETUP:
            return { ...state, initialSetup: action.payload};
        case FETCH_CUSTOMERS:
            return { ...state, dataCustomers: action.payload};
        default:
            return state;
    }
}