import Api from '@/service/Api'

export default {
    async getCities() {
        const response = await Api.get('/db/city');
        return response.data.data
    },
    async getPoints(cityId) {
        if (cityId) {
            const response = await Api.get(`/db/point/?cityId=${cityId}`);
            return response.data.data;
        }
    },
    async getCategories() {
        const response = await Api.get(`/db/category`);
        return response.data.data;
    },
    async getProducts(params) {
        const response = await Api.get(`/db/car/`, {params});
        return response.data;
    },
}