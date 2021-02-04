import axios from 'axios';
import { store } from '@/store/store';

const MY_HOSTNAME = 'localhost';

export default function setup() {
    axios.interceptors.request.use(async config => {
        let hostname = new URL(config.url).hostname;
        if (hostname !== MY_HOSTNAME) {
            return config;
        }

        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return config;
        }

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
            var originalRequest = error.config;
            if (error.response) {
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    store.dispatch('auth/renew').then(
                        newJwt => {
                            if (!newJwt || !newJwt.accessToken) {
                                store.dispatch('auth/logout');
                                return Promise.reject(error);
                            }
                            // axios.defaults.headers.common[
                            //     'Authorization'
                            // ] = `Bearer ${newJwt.accessToken}`;
                            originalRequest.headers.Authorization = `Bearer ${newJwt.accessToken}`;
                            return Promise.resolve(axios(originalRequest));
                        },
                        error => {
                            store.dispatch('auth/logout');
                            return Promise.reject(error);
                        }
                    );
                } else {
                    return Promise.reject(error);
                }
            } else if (error.request) {
                return Promise.reject(
                    `Cannot reach service due to network problems. Please try again later.`
                );
            }
        }
    );
}
