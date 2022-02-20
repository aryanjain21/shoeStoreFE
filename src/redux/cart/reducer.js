import { TYPE } from './type.js';
import { initialState } from './initial-state.js';

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.CART_LIST:
            return {
                ...state,
                cartList: action.payload
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

export default CartReducer;