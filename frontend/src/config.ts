export const API_URL = import.meta.env.VITE_API_HOST;
export const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true';

console.log(import.meta.env, ENABLE_MOCK, API_URL);
