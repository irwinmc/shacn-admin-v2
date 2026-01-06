import { Outlet } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export function DashboardLayout() {
	const onClick = () => {
		toast('Event has been created.');
	};

	return (
		<div>
			<Outlet />
			<Button variant="outline" onClick={onClick}>
				Logout
			</Button>
		</div>
	);
}
