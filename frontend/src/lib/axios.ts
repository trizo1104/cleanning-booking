import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cleanning-booking.onrender.com/api",
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosInstance;
