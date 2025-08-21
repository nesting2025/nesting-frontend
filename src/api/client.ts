import axios from "axios";

// 공통 base 설정
const BASE_URL = import.meta.env.VITE_BASE_URL;
const TIMEOUT = 5000;
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
};

// publicClient
export const publicClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: COMMON_HEADERS,
});

publicClient.interceptors.request.use(
  (config) => {
    console.log("Public API Request:", {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL ?? ''}${config.url ?? ''}`,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error("Public Request Error: ", error);
    return Promise.reject(error);
  }
);

publicClient.interceptors.response.use(
  (response) => {
    console.log("Public API Response:", response.data);
    return response.data;
  },
  (error) => {
    if(error.response) {
      console.log("Public API Error Response:", error.response.data);
      return Promise.reject({
        ...error,
        message: error.response.data.message || error.message,
        data: error.response.data,
        status: error.response.status,
      });
    }
    else {
      console.error("Public API Error:", error);
      return Promise.reject(error);
    }
  }
);

// authClient
export const authClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: COMMON_HEADERS,
});

authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Auth API Request:", {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL ?? ''}${config.url ?? ''}`,
      headers: config.headers,
      data: config.data
    });

    return config;
  },
  (error) => {
    console.error("Auth Request Error: ", error);
    return Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => {
    console.log("Auth API Response:", response.data);
    return response.data;
  },
  (error) => {
    if(error.response) {
      console.log("Auth API Error Response:", error.response.data);
      return Promise.reject({
        ...error,
        message: error.response.data.message || error.message,
        data: error.response.data,
        status: error.response.status,
      });
    }
    else {
      console.error("Auth API Error:", error);
      return Promise.reject(error);
    }
  }
);

export default publicClient;