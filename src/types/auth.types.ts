/** 登录请求参数 */
export interface LoginCredentials {
	username: string;
	password: string;
}

/** 注册请求参数 */
export interface RegisterData {
	username: string;
	email: string;
	password: string;
}

/** 刷新Token请求参数 */
export interface RefreshTokenRequest {
	refreshToken: string;
}

/** 登录/注册响应 */
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

/** Token刷新响应 */
export interface RefreshTokenResponse {
	success: boolean;
	message: string;
	data: {
		accessToken: string;
		refreshToken?: string;
	};
}
