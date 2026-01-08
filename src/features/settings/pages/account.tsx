import { AccountForm } from '../components/account-form';

export const AccountSettings = () => {
	return (
		<>
			<div className="space-y-6 px-4 lg:px-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
					<p className="text-muted-foreground">Manage your account settings and preferences.</p>
				</div>
				<AccountForm />
			</div>
		</>
	);
};
