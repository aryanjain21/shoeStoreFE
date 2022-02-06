import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/auth/signup`, data);
}

export const login = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/auth/login`, data);
}

export const changePassword = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/change-password`, data);
}

export const getAllAddress = (data) => {
    return axios.get(`${process.env.REACT_APP_BACKEND}v1/api/get_user_addresses`, data);
}

export const addAddress = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/api/add_address`, data)
}

export const updateAddress = (data) => {
    return axios.put(`${process.env.REACT_APP_BACKEND}v1/api/update_user_address`, data);
}

export const deleteAddress = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/delete-address`, data);
}

export const getAllProduct = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}v1/auth/get_all_products`, data);
}