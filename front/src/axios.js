import axios from "axios";

const BASEURL = "http://localhost:8888";

export const $authRoutes = axios.create({ baseURL: `${BASEURL}/auth` });
export const $apiRoutes = axios.create({ baseURL: `${BASEURL}/api` });

$apiRoutes.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
