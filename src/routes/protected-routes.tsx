import { createRoute, redirect } from '@tanstack/react-router';
import type { rootRoute as RootRouteType } from './router';
import { useAuthStore } from '@/stores/auth-store';
import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
import { Dashboard } from '@/features/dashboard';
import { Users } from '@/features/users';

export function createProtectedRoutes(rootRoute: typeof RootRouteType) {
	// 受保护的根路由（作为 Layout 路由）
	const protectedRoute = createRoute({
		getParentRoute: () => rootRoute,
		id: 'protected',
		component: AuthenticatedLayout,
		beforeLoad: ({ location }) => {
			const { accessToken } = useAuthStore.getState();
			if (!accessToken) {
				throw redirect({
					to: '/login',
					search: { redirect: location.href },
				});
			}
		},
	});

	// 首页（Dashboard）
	const indexRoute = createRoute({
		getParentRoute: () => protectedRoute,
		path: '/',
		component: Dashboard,
	});

	// 用户管理
	const usersRoute = createRoute({
		getParentRoute: () => protectedRoute,
		path: '/users',
		component: Users,
	});

	return {
		protectedRoute: protectedRoute.addChildren([indexRoute, usersRoute]),
	};
}
