import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://glowing-banoffee-f9f433.netlify.app/api'
});

export default instance;