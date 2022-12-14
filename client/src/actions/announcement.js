import * as api from '../api';
import { CREATE_ANNOUNCEMENT, FETCH_ANNOUNCEMENT, FETCH_ANNOUNCEMENT_FOR_ADMIN,CLOSE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT } from '../constants/actionTypes';

export const fetchAnnouncement = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchAnnouncement(id);
        data["type"] = "opening";
        data["isTimeLimit"] = data.duration ? true : false;
        if(data.status){
            dispatch({ type: FETCH_ANNOUNCEMENT, payload: data })   
        }
        dispatch({ type: FETCH_ANNOUNCEMENT_FOR_ADMIN, payload: data })   
    } catch (error) {
        console.log(error);
    }
}

export const closeAnnouncement = () => async (dispatch) => {
    try {
        dispatch({ type: CLOSE_ANNOUNCEMENT })
    } catch (error) {
        console.log(error)
    }
}

export const createAnnouncement = (announcement) => async (dispatch) => {
    try {
        const { data } = await api.createAnnouncement(announcement);
        console.log(data)
    } catch (error){
        console.log(error)
    }
}

export const updateAnnouncement = (announcement, id) => async (dispatch) => {
    try {
        const { data } = await api.updateAnnouncement(announcement, id);
        dispatch({ type: UPDATE_ANNOUNCEMENT, payload: data })
    } catch (error){
        console.log(error)
    }
}