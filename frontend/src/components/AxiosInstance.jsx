import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosInstence = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstence.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token')
    if (token) {
      config.headers.Authorization =  `Token ${token}`
    }
    else {
      config.headers.Authorization = ``
    }
    return config;

  }
)


AxiosInstence.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("Token");
      window.location.href = "/";
    }
    return Promise.reject(error); 
  }
);

export default AxiosInstence;