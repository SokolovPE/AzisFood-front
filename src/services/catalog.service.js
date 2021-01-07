import axios from 'axios';

const API_URL = 'https://localhost:5000/gateway';

class CatalogService {
    getCategories() {
        return axios.get(`${API_URL}/category`);
    }

    getGoods() {
        return axios.get(`${API_URL}/good`);
    }

    getGoodsInCategory(categoryId) {
        return axios.get(`${API_URL}/goodsInCategory/${categoryId}`);
    }
}

export default new CatalogService();
