import { BrowserRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Login } from '@/features/auth/Login';
import { Register } from '@/features/auth/Register';

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="register" element={<Register />} />

				<Route
					path="/"
					element={
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
