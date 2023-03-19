export const httpClient = {
  baseURL: 'https://cenoteando.org/',
  timeout: 10000,
  headers: {
    post: {
      'content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
};