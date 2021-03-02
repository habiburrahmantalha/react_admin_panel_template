import axios from "axios";
import {localStorageKey} from "./LocalStorage";

const getToken = () => localStorage.getItem(localStorageKey.AUTH_TOKEN);

let axiosWrapper = axios.create({
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers": '*',
        "Access-Control-Allow-Origin": '*',
        'Access-Control-Allow-Credentials': 'true'
    },
});

axiosWrapper.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosWrapper;

