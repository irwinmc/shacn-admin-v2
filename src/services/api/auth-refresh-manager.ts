import axios from 'axios';
import { API_CONFIG } from '@/constants/config';
import { useAuthStore } from '@/stores/auth-store';
import { authEvents } from './auth-events';

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const refreshAxios = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	withCredentials: true,
	timeout: API_CONFIG.TIMEOUT,
});

export async function refreshAccessToken(): Promise<string> {
	if (isRefreshing) {
		return new Promise(resolve => queue.push(resolve));
	}

	isRefreshing = true;

	try {
		const res = await refreshAxios.post('/auth/refresh');
		const accessToken = res.data?.data?.accessToken;

		if (!accessToken) {
			throw new Error('Invalid refresh response');
		}

		useAuthStore.getState().setAccessToken(accessToken);

		queue.forEach(resolve => resolve(accessToken));
		queue = [];

		return accessToken;
	} catch (err) {
		queue = [];
		useAuthStore.getState().reset();
		authEvents.emit('unauthorized');
		throw err;
	} finally {
		isRefreshing = false;
	}
}
