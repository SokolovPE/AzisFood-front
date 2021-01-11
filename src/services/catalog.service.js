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
        return axios.get(`${API_URL}/good/goodsInCategory/${categoryId}`);
    }

    getGoodCntInCategory(categoryId) {
        return axios.get(`${API_URL}/good/goodCntInCategory/${categoryId}`);
    }

    createGood(good) {
        return axios.post(`${API_URL}/good`, good);
    }

    updateGood(goodId, good) {
        return axios.put(`${API_URL}/good/${goodId}`, good);
    }

    deleteGood(goodId) {
        return axios.delete(`${API_URL}/good/${goodId}`);
    }
}

export default new CatalogService();
