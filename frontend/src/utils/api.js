import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanager-wqs7.onrender.com/api/v1/auth/register",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
