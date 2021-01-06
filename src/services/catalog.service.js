import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL = 'https://localhost:5000/gateway';

class CatalogService {
    getCategories() {
        return axios.get(`${API_URL}/category`, { headers: authHeader() });
    }

    getGoods() {
        return axios.get(`${API_URL}/good`, { headers: authHeader() });
    }

    getGoodsInCategory(categoryId) {
        return axios.get(`${API_URL}/goodsInCategory/${categoryId}`, {
            headers: authHeader()
        });
    }
}

export default new CatalogService();
