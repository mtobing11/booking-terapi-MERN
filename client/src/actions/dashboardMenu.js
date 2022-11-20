import * as api from '../api';
import { ACTIVE_MENU, RESIZE_SCREEN } from '../constants/actionTypes';

export const handleActiveMenu = (activeMenu) => (dispatch) => {
    // console.log("action active menu")
    dispatch({ type: ACTIVE_MENU, payload: activeMenu })
}

export const handleResizeScreen = (screenSize) => (dispatch) => {
    // console.log("size:", screenSize);
    dispatch({ type: RESIZE_SCREEN, payload: screenSize })
}