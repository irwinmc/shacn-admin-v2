/**
 * Axios API 实例配置
 * 包含 JWT 拦截器、错误处理、超时和重试机制
 */

import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { API_CONFIG } from '@/constants/config';
import { useAuthStore } from '@/stores/auth-store';

// 用于标记刷新token请求的标识
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

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
 * 将请求加入等待队列
 */
const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else if (token) {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

/**
 * 刷新访问令牌
 */
const refreshAccessToken = async (): Promise<string> => {
	const { refreshToken, setAccessToken, setRefreshToken, reset } = useAuthStore.getState();

	if (!refreshToken) {
		throw new Error('No refresh token available');
	}

	try {
		const response = await axios.post(
			`${API_CONFIG.BASE_URL}/auth/refresh`,
			{
				refreshToken,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const { accessToken, refreshToken: newRefreshToken } = response.data.data;

		setAccessToken(accessToken);

		if (newRefreshToken) {
			setRefreshToken(newRefreshToken);
		}

		return accessToken;
	} catch (error) {
		reset();

		window.location.href = '/login';
		throw error;
	}
};

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
 * 响应拦截器 - 统一错误处理和token刷新逻辑
 */
apiInstance.interceptors.response.use(
	response => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

		// 处理 401 错误 - Token 过期或无效
		if (error.response?.status === 401) {
			const { reset } = useAuthStore.getState();
			const requestUrl = originalRequest?.url || '';
			const isAuthRequest =
				requestUrl.includes('/auth/login') ||
				requestUrl.includes('/auth/register') ||
				requestUrl.includes('/auth/refresh');
			const isOnLoginPage = window.location.pathname === '/login';

			// 如果是认证请求（登录、注册、刷新）返回401，则直接退出
			if (isAuthRequest) {
				reset();

				if (!isOnLoginPage) {
					window.location.href = '/login';
				}
				return Promise.reject(formatError(error));
			}

			// 如果不是重试请求，尝试刷新token
			if (!originalRequest._retry) {
				if (isRefreshing) {
					// 如果正在刷新token，将请求加入队列等待
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					})
						.then(token => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							return apiInstance(originalRequest);
						})
						.catch(err => {
							return Promise.reject(err);
						});
				}

				originalRequest._retry = true;
				isRefreshing = true;

				try {
					const newToken = await refreshAccessToken();
					processQueue(null, newToken);
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return apiInstance(originalRequest);
				} catch (refreshError) {
					processQueue(refreshError, null);
					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			} else {
				// 已经重试过的请求仍然401，说明刷新失败
				reset();

				if (!isOnLoginPage) {
					window.location.href = '/login';
				}
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
			typeof error.response?.data === 'object' && error.response?.data !== null
				? (error.response.data as Record<string, unknown>).message || error.message
				: error.message || 'An error occurred';

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
