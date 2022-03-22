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
}