import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomvista-code.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;