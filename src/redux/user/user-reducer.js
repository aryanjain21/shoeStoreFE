import { TYPE } from './user-type.js';
import { initialState } from './initial-state.js';

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.SIGN_IN:
            return {
                ...state,
                user: action.payload
            }
        case TYPE.SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;