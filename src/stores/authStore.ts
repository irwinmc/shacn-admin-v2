import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user.types';
import { STORAGE_KEYS } from '../constants';

interface AuthState {
	user: User | null;
	token: string | null;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
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
			token: null,

			setUser: user =>
				set({
					user,
				}),

			setToken: token =>
				set({
					token,
				}),

			reset: () => {
				set({
					user: null,
					token: null,
				});
			},
		}),
		{
			name: STORAGE_KEYS.AUTH_TOKEN,
		}
	)
);

/**
 * Selector: 检查用户是否已认证
 */
export const selectIsAuthenticated = (state: AuthState) => !!state.user && !!state.token;
