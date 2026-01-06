import { RegisterForm } from '../components/register-form';

export function Register() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<RegisterForm className="w-full max-w-5xl" />
		</div>
	);
}
