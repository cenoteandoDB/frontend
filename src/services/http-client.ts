export const httpClient = {
  baseURL: import.meta.env.VITE_CLIENT_URL,
  timeout: 10000,
  headers: {
    post: {
      'content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
};