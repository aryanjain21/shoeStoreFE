import { TYPE } from './type.js';
import { initialState } from './initial-state.js';

const WishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.WISHLIST:
            return {
                ...state,
                wishlist: action.payload,
                productInWIshlist: action.payload.products.length
            }
        case TYPE.SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }
        case TYPE.UPDATE_LENGTH:
            return {
                ...state,
                productInWIshlist: action.payload.products.length
            }
        default:
            return state;
    }
}

export default WishlistReducer;