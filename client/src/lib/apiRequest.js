import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomvista-code-xx59.vercel.app/api",
  withCredentials: true,
});

export default apiRequest;