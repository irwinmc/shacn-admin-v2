import { BrowserRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './protected-route';

import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
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
							<AuthenticatedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
