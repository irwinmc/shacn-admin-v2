import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function Login() {
	const onClick = () => {
		toast('Event has been created.');
	};

	return (
		<div>
			<h1>登录</h1>
			<Button variant="outline" onClick={onClick}>
				登录
			</Button>
		</div>
	);
}
