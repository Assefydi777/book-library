import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://book-library-nd76.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export { axiosInstance };