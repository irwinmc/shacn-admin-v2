import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth-store';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface SignOutDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
	const navigate = useNavigate();
	const { reset } = useAuthStore();

	const onSignOut = () => {
		reset();

		navigate({
			to: '/login',
			replace: true,
		});
	};

	return (
		<ConfirmDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Sign out"
			desc="Are you sure you want to sign out? You will need to sign in again to access your account."
			confirmButtonText="Sign out"
			destructive
			onConfirm={onSignOut}
			className="sm:max-w-sm"
		/>
	);
}
