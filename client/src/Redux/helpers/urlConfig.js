const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://elimart-serverr.onrender.com/'
export const API = `${baseURL}/api`
