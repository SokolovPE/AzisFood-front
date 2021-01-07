import axios from 'axios';
import { store } from '@/store/store';

export default function setup() {
    axios.interceptors.request.use(async config => {
        let user = JSON.parse(localStorage.getItem('user'));
        config.headers = {
            Authorization: `Bearer ${user.accessToken}`
        };

        return config;
    });

    axios.interceptors.response.use(
        response => {
            return response;
        },
        async function(error) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                store.dispatch('auth/renew').then(
                    newJwt => {
                        axios.defaults.headers.common['Authorization'] =
                            'Bearer ' + newJwt.accessToken;
                        return axios(originalRequest);
                    },
                    error => {
                        console.log(error);
                        return Promise.reject(error);
                    }
                );
            }
        }
    );
}
