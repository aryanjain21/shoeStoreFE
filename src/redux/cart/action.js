import { TYPE } from './type.js';
import { getCart, updateQty } from '../../services/index.js';
import { toast } from 'react-toastify';

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
            console.error('fetchCartList error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}

export const updateProductQty = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        updateQty(data).then(resp => {
            if(resp.data.status === 200) {
                toast.success(resp.data.message);
                dispatch(cartList(resp.data.data));
            }
        }).catch(error => {
            toast.error(error.response.data.message);
            console.error('updateProductQty error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}