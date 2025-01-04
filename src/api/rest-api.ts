import axios from 'axios';

export const BASE_API_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


/**
 * Utility function to make API calls.
 *
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param data - The request variables
 * @param params - The request URL parameters
 * @returns {Promise} - Promise resolving to API response data.
 */
export const apiRequest = async (url: string, method: string, data?: object, params?: object): Promise<any> => {
    try {
        const response = await apiClient({
            url,
            method,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        // Log error and rethrow it for specific handling
        console.error('API Request Error:', error);
        throw error;
    }
};

export default apiClient;