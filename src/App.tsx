import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services';

import { Toaster } from '@/components/ui/sonner';

import './locale';
import { AppRoutes } from './routes';

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppRoutes />
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
