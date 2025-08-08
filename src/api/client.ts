import axios from "axios";

const client = axios.create({
    baseURL: "http://13.124.101.243:9091/users/api/v1",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        console.log("API Request:", {
            method: config.method?.toUpperCase(),
            url: `${config.baseURL ?? ''}${config.url ?? ''}`,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error("Request Error: ", error);
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    (response) => {
        console.log("API Response:", response.data);
        return response.data;
    },
    (error) => {
        if(error.response) {
            console.log("API Error Response:", error.response.data);
            return Promise.reject({
                ...error,
                message: error.response.data.message || error.message,
                data: error.response.data,
                status: error.response.status,
            });
        }
        else {
            console.error("API Error:", error);
            return Promise.reject(error);
        }
    }
);

export default client;