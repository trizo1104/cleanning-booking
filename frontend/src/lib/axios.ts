import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosInstance;
