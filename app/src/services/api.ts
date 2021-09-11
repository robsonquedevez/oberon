import axios from 'axios';

const conn = axios.create({
    baseURL: 'http://localhost:4004'
});

export default conn;