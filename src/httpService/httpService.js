import axios from "axios";

const API_BASE_URL = "https://appsellapi.thecbt.live/api";
//const API_BASE_URL = "http://192.168.100.50:3001/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
