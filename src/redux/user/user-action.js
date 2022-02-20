import { TYPE } from './user-type.js';
import { login } from '../../services/index.js';

export const signin = (user) => {
    return {
        type: TYPE.SIGN_IN,
        payload: user
    }
}

export const setLoader = (loaderState) => {
    return {
        type: TYPE.SET_LOADER,
        payload: loaderState
    }
}

export const signout = () => {
    return {
        type: TYPE.LOG_OUT
    }
}

export const fetchUserDetails = (data) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        login(data).then(resp => {
            let user = resp.data.data;
            dispatch(signin(user));
            if ('undefined' !== typeof window) {
                window.location.href = '/home';
            }
            localStorage.setItem('setUser', JSON.stringify({ fullName: user.fullName, email: user.email, token: user.token, id: user._id }));
        }).catch(error => {
            console.log('fetchUserDetails error>>>', error.response);
        }).finally(() => dispatch(setLoader(false)));
    }
}