import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://lounge-backend.onrender.com'
    });
    
export default instance;