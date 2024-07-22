import axios from "axios";

const axiosUrl = axios.create({
    baseURL: 'https://trade.namtech.uz'
})

axiosUrl.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('admin-token')

export default axiosUrl