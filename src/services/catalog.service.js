import axios from 'axios';

const API_URL = 'https://localhost:5000/gateway';

class CatalogService {
    getCategories() {
        return axios.get(`${API_URL}/category`);
    }

    getCategoriesWithCnt() {
        return axios.get(`${API_URL}/category/getWithCnt`);
    }

    createCategory(category) {
        return axios.post(`${API_URL}/category`, category);
    }

    getGoods() {
        return axios.get(`${API_URL}/good`);
    }

    getGoodsInCategory(categoryId) {
        return axios.get(`${API_URL}/goodsInCategory/${categoryId}`);
    }

    getGoodCntInCategory(categoryId) {
        return axios.get(`${API_URL}/good/goodCntInCategory/${categoryId}`);
    }
}

export default new CatalogService();
