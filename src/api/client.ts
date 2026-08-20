import axios from "axios";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export const apiClient = axios.create({
  baseURL: COINGECKO_API,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.warn("Rate limit hit. Waiting before retry...");
      //implement exponential backoff here
    }
    return Promise.reject(error);
  },
);

//Helper to add cache-busting to prevent browser caching

apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    x_cg_demo_api_key: import.meta.env.VITE_COINGECKO_API_KEY,
  };
  return config;
});
