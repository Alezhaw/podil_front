import axios from "axios";
// const LOCAL_URL = 'https://localhost:7004/api/'
//const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_HOST || 'asdasdasd-front.onrender.com' : window.location.host;
export const defaultUrl = `https://back-nnk5.onrender.com`; // https://back-nnk5.onrender.com/ http://localhost:5000/
axios.defaults.baseURL = defaultUrl;

// axios.interceptors.request.use((request:any) => {
//
// });
axios.defaults.headers.common["Access-Control-Allow-Origin"] = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
export default axios;
