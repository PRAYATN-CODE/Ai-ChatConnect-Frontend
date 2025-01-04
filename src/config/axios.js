import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ai-chatconnect-backend.onrender.com',
})

export default axiosInstance;