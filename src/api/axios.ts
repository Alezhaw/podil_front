import axios from "axios";
// const LOCAL_URL = 'https://localhost:7004/api/'
//const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_HOST || 'asdasdasd-front.onrender.com' : window.location.host;
export const defaultUrl = `https://back-nnk5.onrender.com/`; // https://back-nnk5.onrender.com/ http://localhost:5000/
axios.defaults.baseURL = defaultUrl;

// axios.interceptors.request.use((request:any) => {
//
// });

export default axios;

export const getConfig = () => ({
  headers: {
    "Access-Control-Allow-Origin": true,
    "Content-type": `application/json`,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
