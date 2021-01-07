import axios from 'axios';

const API_URL = 'https://localhost:5000/gateway';

class AuthService {
    login(user) {
        return axios
            .post(`${API_URL}/identity/login`, {
                email: user.email,
                login: user.login,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    renew(oldJwt) {
        return axios.post(`${API_URL}/identity/renew`, oldJwt).then(
            response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            },
            error => {
                console.log(error);
            }
        );
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(`${API_URL}/identity/register`, {
            email: user.email,
            password: user.password,
            login: user.login
        });
    }
}

export default new AuthService();
