import { TYPE } from './type.js';
import { initialState } from './initial-state.js';

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.ORDER_LIST:
            return {
                ...state,
                orderList: action.payload
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

export default OrderReducer;