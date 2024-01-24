import axios from "axios";
const userToken = localStorage.getItem("userToken");

const API = axios.create({
  baseURL: "https://cyberteq-falcon-api.onrender.com/api",
  headers: { Authorization: `Bearer ${userToken}` },
});

export default API;
