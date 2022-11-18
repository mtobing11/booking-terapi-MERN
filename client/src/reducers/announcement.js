import { CREATE_ANNOUNCEMENT, FETCH_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT } from '../constants/actionTypes';

export default(state = { isAnnounce: false, announceData: [] }, action) => {
    switch(action.type) {
        case FETCH_ANNOUNCEMENT:
            return { ...state, isAnnounce: true, announceData: [...state.announceData, action.payload] };
            // return { ...state, isAnnounce: true, announceData: action.payload }
        case CLOSE_ANNOUNCEMENT:{ 
                const tempAnnounceData = [...state.announceData];
                let newAnnounceData = tempAnnounceData.splice(1);
                
                return {
                    ...state, 
                    isAnnounce: newAnnounceData.length > 0 ? true: false, 
                    announceData: newAnnounceData
                }
            }
            // return { ...state, isAnnounce: false, announceData: ''}
        default:
            return state;
    }
}