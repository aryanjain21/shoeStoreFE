import { TYPE } from './type.js';
import { getAllOrders, getOrder } from '../../services/index.js';
import { toast } from 'react-toastify';

export const orderList = (order) => {
    return {
        type: TYPE.ORDER_LIST,
        payload: order
    }
}

export const setLoader = (loaderState) => {
    return {
        type: TYPE.SET_LOADER,
        payload: loaderState
    }
}

export const fetchAllOrderList = () => {
    return (dispatch) => {
        dispatch(setLoader(true));
        getAllOrders().then(resp => {
            let list = resp.data.data;
            dispatch(orderList(list))
        }).catch(error => {
            console.error('fetchOrderList error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}

export const fetchOrder = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        getOrder(data).then(resp => {
            console.log('2345>>>', resp.data)
            if(resp?.data?.status === 200) {
                // toast.success(resp?.data?.message);
                console.log('2345>>>', resp.data)
                dispatch(orderList(resp?.data?.data));
            }
        }).catch(error => {
            toast.error(error?.response?.data?.message);
            console.error('fetchOrder error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}