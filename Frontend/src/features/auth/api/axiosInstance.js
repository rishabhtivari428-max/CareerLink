import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://careerlink-f40y.onrender.com",
    withCredentials: true
})

export default axiosInstance