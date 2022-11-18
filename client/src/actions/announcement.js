import * as api from '../api';
import { CREATE_ANNOUNCEMENT, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT } from '../constants/actionTypes';

export const fetchAnnouncement = (id) => async (dispatch) => {
    try {
        console.clear();
        console.log('fetch Announcement begin')
        const { data } = await api.fetchAnnouncement(id);
        data["type"] = "opening";
        data["isTimeLimit"] = data.duration ? true : false;
        console.log(data)
        dispatch({ type: FETCH_ANNOUNCEMENT, payload: data })   
    } catch (error) {
        if(error.response.status === 404) {
            console.log(error.response.data)
        } else {
            console.log(error);
        }
    }
}

export const closeAnnouncement = () => async (dispatch) => {
    try {
        dispatch({ type: CLOSE_ANNOUNCEMENT })
    } catch (error) {
        console.log(error)
    }
}