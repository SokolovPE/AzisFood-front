import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL = 'https://localhost:5000/gateway';

class CatalogService {
    getCategories() {
        return axios.get(`${API_URL}/category`, { headers: authHeader() });
    }
}

export default new CatalogService();
