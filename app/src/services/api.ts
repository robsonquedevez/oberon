import axios from 'axios';

const conn = axios.create({
    baseURL: 'http://192.168.1.112:4004'
});

export default conn;