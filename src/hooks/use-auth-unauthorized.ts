import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { authEvents } from '@/services';

export function useAuthUnauthorized() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// 订阅未授权事件
		const unsubscribe = authEvents.subscribe((event: string) => {
			if (event === 'unauthorized') {
				// 跳转到登录页，保存当前路径用于登录后重定向
				navigate({
					to: '/login',
					search: { redirect: location.pathname },
					replace: true, // 替换历史记录，防止返回
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, [navigate, location.pathname]);
}
