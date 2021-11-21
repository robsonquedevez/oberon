import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://54.232.216.22:4004/'
    baseURL: 'http://192.168.1.112:4004/'
});

export default api;