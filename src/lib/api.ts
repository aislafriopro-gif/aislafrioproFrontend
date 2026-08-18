import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";
import Cookies from "js-cookie";

export const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("token"); 

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                Cookies.remove("token");
            } else if (status === 403) {
            } else if (status >= 500) {
            }
        }
        return Promise.reject(error);
    }
);

export default api;