import axios from 'axios';
import { REACT_APP_BE_URL } from '../config';
const instance = axios.create({
        baseURL: 'https://lounge-backend.onrender.com/api'
    });
    
export default instance;