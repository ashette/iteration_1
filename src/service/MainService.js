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
    async getRates(params) {
        const response = await Api.get(`/db/rate/`);
        return response.data.data;
    },
    async getOrder(id) {
        const response = await Api.get(`/db/order/${id}`);
        return response.data.data;
    },
    async getOrderStatus() {
        const response = await Api.get(`/db/orderStatus/`);
        return response.data.data;
    },
    async addOrder(order) {
        const response = await Api.post(`/db/order/`, order);
        return response.data.data;
    },
}