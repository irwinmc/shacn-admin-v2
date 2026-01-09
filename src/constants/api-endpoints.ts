/**
 * API 端点常量管理
 * 集中管理所有API端点，便于维护和版本控制
 */

export const API_ENDPOINTS = {
	auth: {
		login: '/auth/login',
		register: '/auth/register',
		logout: '/auth/logout',
		refresh: '/auth/refresh',
		me: '/auth/me',
	},
} as const;
