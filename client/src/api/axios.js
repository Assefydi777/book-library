import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "localhost:5500/api/",
});

export { axiosInstance };