import { createRootRoute, createRoute, createRouter, RouterProvider, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth-store';
import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';

import { Login } from '@/features/auth/Login';
import { Register } from '@/features/auth/Register';
import { Dashboard } from '@/features/dashboard/Dashboard';

// 创建根路由
const rootRoute = createRootRoute();

// 登录路由
const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login,
});

// 注册路由
const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/register',
	component: Register,
});

// 受保护的根路由（作为 Layout 路由，无 path）
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

// 路由树
const routeTree = rootRoute.addChildren([
	loginRoute,
	registerRoute,
	protectedRoute.addChildren([indexRoute, dashboardRoute]),
]);

// 创建路由实例
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
});

// 注册路由实例以支持类型推断
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export function AppRoutes() {
	return <RouterProvider router={router} />;
}
