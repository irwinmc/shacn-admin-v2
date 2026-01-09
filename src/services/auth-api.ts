/**
 * 认证相关的API服务
 * 提供登录、注册、刷新token等功能
 */

import { apiInstance } from './api';
import { useAuthStore } from '@/stores/auth-store';
import type { AxiosResponse } from 'axios';

// 定义认证相关的类型
export interface LoginCredentials {
	username: string;
	password: string;
}

export interface RegisterData {
	username: string;
	email: string;
	password: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface AuthResponse {
	success: boolean;
	message: string;
	data: {
		accessToken: string;
		refreshToken: string;
		user: {
			id: number;
			username: string;
			email: string;
			createdAt: string;
			updatedAt: string;
		};
	};
}

export interface RefreshTokenResponse {
	success: boolean;
	message: string;
	data: {
		accessToken: string;
		refreshToken?: string;
	};
}

/**
 * 用户登录
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
	const response: AxiosResponse<AuthResponse> = await apiInstance.post('/auth/login', credentials);
	return response.data;
};

/**
 * 用户注册
 */
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
	const response: AxiosResponse<AuthResponse> = await apiInstance.post('/auth/register', userData);
	return response.data;
};

/**
 * 刷新访问令牌
 */
export const refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
	const response: AxiosResponse<RefreshTokenResponse> = await apiInstance.post('/auth/refresh', {
		refreshToken,
	});
	return response.data;
};

/**
 * 用户登出
 */
export const logout = async (): Promise<void> => {
	try {
		await apiInstance.post('/auth/logout');
	} catch (error) {
		// 即使登出API失败，也要清理本地状态
		console.warn('Logout API call failed, but proceeding with local cleanup:', error);
	} finally {
		// 清理本地状态（会自动清除localStorage中的数据）
		const { reset } = useAuthStore.getState();
		reset();
	}
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async () => {
	const response = await apiInstance.get('/auth/me');
	return response.data;
};
