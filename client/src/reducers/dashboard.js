import { ACTIVE_MENU, RESIZE_SCREEN } from '../constants/actionTypes';

export default(state = { activeMenu: true }, action) => {
    switch(action.type) {
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        default:
            return state;
    }
}