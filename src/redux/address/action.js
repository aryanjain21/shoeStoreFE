import { TYPE } from './type.js';
import { getAllAddress } from '../../services/index.js';

export const addressList = (product) => {
    return {
        type: TYPE.ADDRESS_LIST,
        payload: product
    }
}

export const setLoader = (loaderState) => {
    return {
        type: TYPE.SET_LOADER,
        payload: loaderState
    }
}

export const fetchAddressList = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        getAllAddress(data).then(resp => {
            let list = resp.data.data;
            dispatch(addressList(list))
        }).catch(error => {
            console.log('fetchAddressList error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}