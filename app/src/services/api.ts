import axios from 'axios';

const conn = axios.create({
    // baseURL: 'http://54.232.216.22:4004/'
    baseURL: 'http://localhost:4004/'
});

export default conn;