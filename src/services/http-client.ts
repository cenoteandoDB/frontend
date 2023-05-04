export const httpClient = {
  baseURL: import.meta.env.VITE_CLIENT_URL,
  timeout: 10000,
  headers: {
    post: {
      'content-Type': 'application/json',
    },
  },
};