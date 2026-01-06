import { createRouter, RouterProvider } from '@tanstack/react-router';
import { rootRoute } from './router';
import { createMainRoutes } from './main-routes';
import { createProtectedRoutes } from './protected-routes';
import { createErrorRoutes } from './error-routes';

// 创建各类路由
const mainRoutes = createMainRoutes(rootRoute);
const { protectedRoute } = createProtectedRoutes(rootRoute);
const errorRoutes = createErrorRoutes(rootRoute);

// 组合路由树
const routeTree = rootRoute.addChildren([...mainRoutes, protectedRoute, ...errorRoutes]);

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
