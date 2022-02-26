import { TYPE } from './type.js';
import { getWishlist, removeFromWishlist } from '../../services/index.js';

export const wishlistAction = (wishlist) => {
    return {
        type: TYPE.WISHLIST,
        payload: wishlist
    }
}

export const setLoader = (loaderState) => {
    return {
        type: TYPE.SET_LOADER,
        payload: loaderState
    }
}

export const updateLength = (data) => {
    return {
        type: TYPE.UPDATE_LENGTH,
        payload: data
    }
}

export const fetchWishlist = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        getWishlist(data).then(resp => {
            let wishlist = resp.data.data;
            dispatch(wishlistAction(wishlist))
        }).catch(error => {
            console.error('fetchWishlist error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}

export const removeProduct = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        removeFromWishlist(data).then(resp => {
            if(resp.data.status === 200) {
                getWishlist().then(resp => {
                    let wishlist = resp.data.data;
                    dispatch(wishlistAction(wishlist))
                }).catch(error => {
                    console.error('getWishlist error>>>', error.response);
                });
            }
        }).catch(error => {
            console.error('removeProduct error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}