import { createRoute } from '@tanstack/react-router';
import type { RootRoute } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth-store';
import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
import { Dashboard } from '@/features/dashboard/Dashboard';

export function createProtectedRoutes(rootRoute: RootRoute<Record<string, unknown>>) {
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

	// 首页
	const indexRoute = createRoute({
		getParentRoute: () => protectedRoute,
		path: '/',
		component: () => <div>Home</div>,
	});

	// Dashboard 路由
	const dashboardRoute = createRoute({
		getParentRoute: () => protectedRoute,
		path: '/dashboard',
		component: Dashboard,
	});

	return {
		protectedRoute: protectedRoute.addChildren([indexRoute, dashboardRoute]),
	};
}
