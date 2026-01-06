/**
 * Axios API 实例配置
 * 包含 JWT 拦截器、错误处理、超时和重试机制
 */

import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/constants/config';
import { useAuthStore } from '@/stores/auth-store';

/**
 * 创建 Axios 实例
 */
export const apiInstance: AxiosInstance = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	timeout: API_CONFIG.TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * 请求拦截器 - 添加 JWT Token
 */
apiInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const { accessToken } = useAuthStore.getState();

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

/**
 * 响应拦截器 - 统一错误处理
 */
apiInstance.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		// 处理 401 错误 - Token 过期或无效
		if (error.response?.status === 401) {
			const requestUrl = error.config?.url || '';
			const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');
			const isOnLoginPage = window.location.pathname === '/login';

			if (!isAuthRequest && !isOnLoginPage) {
				useAuthStore.getState().reset();
				window.location.href = '/login';
			}
		}

		// 处理 403 错误 - 无权限
		if (error.response?.status === 403) {
			console.error('Access forbidden - insufficient permissions');
		}

		// 处理 404 错误 - 资源不存在
		if (error.response?.status === 404) {
			console.error('Resource not found');
		}

		// 处理 500 错误 - 服务器错误
		if (error.response?.status === 500) {
			console.error('Internal server error');
		}

		// 处理网络错误
		if (!error.response) {
			console.error('Network error - please check your connection');
		}

		return Promise.reject(formatError(error));
	}
);

/**
 * 格式化错误对象
 */
export const formatError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const message =
			(error.response?.data as Record<string, unknown>)?.message || error.message || 'An error occurred';

		const formattedError = new Error(message as string) as Error & { code?: string; status?: number };
		formattedError.code = String(status || 'UNKNOWN_ERROR');
		formattedError.status = status;

		return formattedError;
	}

	if (error instanceof Error) {
		return error;
	}

	return new Error('An unknown error occurred');
};

export default apiInstance;
