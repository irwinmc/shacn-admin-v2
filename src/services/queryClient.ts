/**
 * React Query 客户端配置
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * 创建 QueryClient 实例
 */
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			retry: 1,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchOnMount: false,
		},
		mutations: {
			retry: 0,
		},
	},
});

export default queryClient;
