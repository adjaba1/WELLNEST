// Your computer's LAN IP (from ipconfig)
const IP = '172.20.10.3';
const PORT = '8081';

export const API_URL = `http://${IP}:${PORT}/api`;

export const USERS_URL = `${API_URL}/users`;
export const AUTH_URL = `${API_URL}/auth`;
export const ASSESSMENTS_URL = `${API_URL}/assessments`;