import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '@/constants';
import { useAuthStore } from '@/stores/auth-store';
import { authEvents } from './auth-events';

let isRefreshing = false;
let queue: Array<{
	resolve: (token: string) => void;
	reject: (error: Error) => void;
}> = [];

const refreshAxios = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	withCredentials: true,
	timeout: API_CONFIG.TIMEOUT,
});

export async function refreshAccessToken(): Promise<string> {
	if (isRefreshing) {
		return new Promise((resolve, reject) => {
			queue.push({ resolve, reject });
		});
	}

	const { refreshToken } = useAuthStore.getState();

	if (!refreshToken) {
		useAuthStore.getState().reset();
		authEvents.emit('unauthorized');
		throw new Error('No refresh token available');
	}

	isRefreshing = true;

	try {
		const res = await refreshAxios.post(API_ENDPOINTS.auth.refresh, {
			refreshToken,
		});

		const accessToken = res.data?.data?.accessToken;

		if (!accessToken) {
			throw new Error('Invalid refresh response');
		}

		useAuthStore.getState().setAccessToken(accessToken);

		queue.forEach(({ resolve }) => resolve(accessToken));
		queue = [];

		return accessToken;
	} catch (err) {
		// 拒绝所有等待的请求
		const error = err instanceof Error ? err : new Error('Token refresh failed');
		queue.forEach(({ reject }) => reject(error));
		queue = [];

		useAuthStore.getState().reset();
		authEvents.emit('unauthorized');

		throw err;
	} finally {
		isRefreshing = false;
	}
}
