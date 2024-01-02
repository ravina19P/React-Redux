import axios from 'axios'
import { isExpired, decodeToken } from "react-jwt";
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    console.log("axiosInstance.interceptors.request")
    const token = localStorage.getItem("token")
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    console.log(myDecodedToken, isMyTokenExpired)
    if (!isMyTokenExpired) {
        return config;
    } else {
        localStorage.clear()
        window.location.href = '/';
    }
}, (error) => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use((response) => {
    console.log("axiosInstance.interceptors.response")
    return response;
}, (error) => {
    return Promise.reject(error);
})
export default axiosInstance;