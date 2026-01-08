import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/theme-context';

import './locale';
import { AppRoutes } from './routes';

export function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AppRoutes />
				<Toaster position="top-center" />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
