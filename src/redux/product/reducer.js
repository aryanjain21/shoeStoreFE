import { TYPE } from './type.js';
import { initialState } from './initial-state.js';

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.PRODUCT_LIST:
            return {
                ...state,
                product: action.payload
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

export default ProductReducer;