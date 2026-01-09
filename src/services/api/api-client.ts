import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/constants/config';
import { useAuthStore } from '@/stores/auth-store';
import { refreshAccessToken } from './auth-refresh-manager';
import { formatApiError } from './auth-error';

export const apiClient = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	timeout: API_CONFIG.TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const { accessToken } = useAuthStore.getState();
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

apiClient.interceptors.response.use(
	res => res,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes('/auth/refresh')
		) {
			originalRequest._retry = true;

			const newToken = await refreshAccessToken();
			originalRequest.headers.Authorization = `Bearer ${newToken}`;
			return apiClient(originalRequest);
		}

		return Promise.reject(formatApiError(error));
	}
);
