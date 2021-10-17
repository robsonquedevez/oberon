import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.108:4004'
});

export default api;