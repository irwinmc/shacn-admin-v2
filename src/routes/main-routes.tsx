import { createRoute } from '@tanstack/react-router';
import type { rootRoute as RootRouteType } from './router';
import { Login, Register, ForgotPassword } from '@/features/auth';

export function createMainRoutes(rootRoute: typeof RootRouteType) {
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

	// 忘记密码路由
	const forgotPasswordRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/forgot-password',
		component: ForgotPassword,
	});

	return [loginRoute, registerRoute, forgotPasswordRoute];
}
