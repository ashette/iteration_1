import axios from 'axios'

const api = axios.create({
    baseURL: `https://api-factory.simbirsoft1.com/api`,
    headers: {
        'X-Api-Factory-Application-Id': process.env.VUE_APP_ID,
    }
})

api.interceptors.request.use(null, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(null, error => {
    return Promise.reject(error);
});


export default api;