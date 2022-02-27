import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/auth/signup`, data);
}

export const login = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/auth/login`, data);
}

export const changePassword = (data) => {
    return axios.put(`${process.env.REACT_APP_BACKEND}api/change-password`, data);
}

export const getAllAddress = (data) => {
    return axios.get(`${process.env.REACT_APP_BACKEND}v1/api/get-address`, data);
}

export const addAddress = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/api/add-address`, data)
}

export const updateAddress = (data) => {
    return axios.put(`${process.env.REACT_APP_BACKEND}v1/api/update-address`, data);
}

export const deleteAddress = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/api/delete-address`, data);
}

export const getAllProduct = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}auth/get-all-product`, data);
}

export const getProduct = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}auth/get-product`, data);
}

export const addToCart = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/add-to-cart`, data);
}

export const getCart = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND}api/get-user-cart`);
}

export const removeFromCart = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/remove-from-cart`, data);
}

export const emptyCart = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/empty-cart`, data);
}

export const updateQty = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/update-qty`, data);
}

export const moveToWishlist = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/move-to-wishlist`, data);
}

export const addToWishlist = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/add-to-wishlist`, data);
}

export const getWishlist = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND}api/get-wishlist`);
}

export const removeFromWishlist = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/remove-from-wishlist`, data);
}

export const moveToCart = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/move-to-cart`, data);
}