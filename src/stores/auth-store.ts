import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';

interface AuthUser {
	id: number;
	username: string;
	created_at: string;
	updated_at: string;
}

interface AuthState {
	user: AuthUser | null;
	accessToken: string;
	setUser: (user: AuthUser | null) => void;
	setAccessToken: (accessToken: string) => void;
	reset: () => void;
}

/**
 * 认证状态管理 Store
 * 职责：仅管理认证状态
 */
export const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			user: null,
			accessToken: '',

			setUser: user =>
				set({
					user,
				}),

			setAccessToken: accessToken =>
				set({
					accessToken,
				}),

			reset: () => {
				set({
					user: null,
					accessToken: '',
				});
			},
		}),
		{
			name: STORAGE_KEYS.AUTH_TOKEN,
		}
	)
);
