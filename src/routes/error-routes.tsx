import { createRoute } from '@tanstack/react-router';
import type { RootRoute } from '@tanstack/react-router';
import { ForbiddenError, GeneralError, MaintenanceError, NotFoundError, UnauthorizedError } from '@/features/errors';

export function createErrorRoutes(rootRoute: RootRoute<Record<string, unknown>>) {
	// 404 错误
	const notFoundRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/404',
		component: NotFoundError,
	});

	// 401 未授权
	const unauthorizedRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/401',
		component: UnauthorizedError,
	});

	// 403 禁止访问
	const forbiddenRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/403',
		component: ForbiddenError,
	});

	// 503 维护中
	const maintenanceRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/maintenance',
		component: MaintenanceError,
	});

	// 通用错误（500）
	const generalErrorRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/error',
		component: GeneralError,
	});

	return [notFoundRoute, unauthorizedRoute, forbiddenRoute, maintenanceRoute, generalErrorRoute];
}
