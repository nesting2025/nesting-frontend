import axios from "axios";
import { AuthRepository } from "../data/repository/auth/AuthRepository";

// 공통 base 설정
const BASE_URL = import.meta.env.VITE_BASE_URL;
const TIMEOUT = 5000;
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
};

// 토큰 재발급 관련
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if(error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

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
  async (error) => {
    // 토큰 만료 시 토큰 재발급
    const originalRequest: any = error.config;

    if(error.response && 
      error.response.status === 401 &&
      error.response.data?.code === "JWT0002" &&
      !originalRequest._retry
    ) {
      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return authClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if(!refreshToken) {
          throw new Error("No refresh token available");
        }

        const res = await AuthRepository.tokenReissue(refreshToken); 
        console.log("AuthRepository.tokenReissue response", res);
        const newAccessToken = res.data?.accessToken;  
        const newRefreshToken = res.data?.refreshToken;

        if (!newAccessToken) {
          throw new Error("Failed to reissue access token");
        }

        localStorage.setItem("accessToken", newAccessToken);
        if(newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }
        

        authClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        // 실패했던 요청 retry
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

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