import axios from 'axios';
import {
    CatalogService,
    API_URL
} from '@/modules/public/catalog/services/catalog.service';

class AdminCatalogService extends CatalogService {
    createCategory(category) {
        return axios.post(`${API_URL}/category`, category);
    }

    deleteCategory(categoryId) {
        return axios.delete(`${API_URL}/category/${categoryId}`);
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

export default new AdminCatalogService();
