export const API_URL = import.meta.env.VITE_API_HOST || 'http://0.0.0.0:8000/api';
export const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK
    ? import.meta.env.VITE_ENABLE_MOCK === 'true'
    : false;
