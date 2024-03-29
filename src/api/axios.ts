import axios from "axios";
// const LOCAL_URL = 'https://localhost:7004/api/'
//const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_HOST || 'asdasdasd-front.onrender.com' : window.location.host;
export const defaultUrl = `http://localhost:5000/`; // https://back-nnk5.onrender.com/ http://localhost:5000/ http://10.22.2.12:5000/
axios.defaults.baseURL = defaultUrl;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      window.location.href = "/login/true";
    }
    return Promise.reject(error);
  }
);
axios.defaults.headers.common["Access-Control-Allow-Origin"] = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
export default axios;
