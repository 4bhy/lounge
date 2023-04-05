import axios from 'axios';
import { REACT_APP_BE_URL } from '../config';
const instance = axios.create({
        baseURL: REACT_APP_BE_URL
    });
    
export default instance;