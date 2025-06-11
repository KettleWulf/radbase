import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		Authorization: `Bearer ${BEARER_TOKEN}`,
		Accept: "application/json"
	}
});

export default api;
