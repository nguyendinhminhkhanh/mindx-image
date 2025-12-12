import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "http://localhost:3000/api",
});

instance.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
