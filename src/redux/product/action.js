import { TYPE } from './type.js';
import { getAllProduct } from '../../services/index.js';

export const productList = (product) => {
    return {
        type: TYPE.PRODUCT_LIST,
        payload: product
    }
}

export const setLoader = (loaderState) => {
    return {
        type: TYPE.SET_LOADER,
        payload: loaderState
    }
}

export const fetchProductList = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        getAllProduct(data).then(resp => {
            let product = resp.data.data;
            dispatch(productList(product))
        }).catch(error => {
            console.error('fetchProductList error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}