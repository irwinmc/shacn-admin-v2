import { createRoute } from '@tanstack/react-router';
import type { RootRoute } from '@tanstack/react-router';
import { Login } from '@/features/auth/Login';
import { Register } from '@/features/auth/Register';

export function createMainRoutes(rootRoute: RootRoute<Record<string, unknown>>) {
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

	return [loginRoute, registerRoute];
}
