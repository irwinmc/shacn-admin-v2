/**
 * 认证相关的API服务
 * 提供登录、注册、刷新token等功能
 */

import type { AxiosResponse } from 'axios';
import { apiClient } from './api';
import { useAuthStore } from '@/stores/auth-store';
import { API_ENDPOINTS } from '@/constants';
import type { LoginCredentials, RegisterData, AuthResponse, RefreshTokenResponse } from '@/types';

/**
 * 用户登录
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
	const response: AxiosResponse<AuthResponse> = await apiClient.post(API_ENDPOINTS.auth.login, credentials);
	return response.data;
};

/**
 * 用户注册
 */
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
	const response: AxiosResponse<AuthResponse> = await apiClient.post(API_ENDPOINTS.auth.register, userData);
	return response.data;
};

/**
 * 刷新访问令牌
 */
export const refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
	const response: AxiosResponse<RefreshTokenResponse> = await apiClient.post(API_ENDPOINTS.auth.refresh, {
		refreshToken,
	});
	return response.data;
};

/**
 * 用户登出
 */
export const logout = async (): Promise<void> => {
	try {
		await apiClient.post(API_ENDPOINTS.auth.logout);
	} catch (error) {
		console.warn('Logout API call failed, but proceeding with local cleanup:', error);
	} finally {
		const { reset } = useAuthStore.getState();
		reset();
	}
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async () => {
	const response = await apiClient.get(API_ENDPOINTS.auth.me);
	return response.data;
};
