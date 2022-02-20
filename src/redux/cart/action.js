import { TYPE } from './type.js';
import { getCart, updateQty } from '../../services/index.js';

export const cartList = (cart) => {
    return {
        type: TYPE.CART_LIST,
        payload: cart
    }
}

export const setLoader = (loaderState) => {
    return {
        type: TYPE.SET_LOADER,
        payload: loaderState
    }
}

export const fetchCartList = () => {
    return (dispatch) => {
        dispatch(setLoader(true));
        getCart().then(resp => {
            let list = resp.data.data;
            dispatch(cartList(list))
        }).catch(error => {
            console.log('fetchCartList error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}

export const updateProductQty = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        updateQty(data).then(resp => {
            if(resp.data.status === 200) {
                console.log(resp.data.data);
            }
        }).catch(error => {
            console.log('updateProductQty error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}